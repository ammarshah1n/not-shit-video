#!/usr/bin/env python3
"""Lengthen a music bed without re-generating it: at each requested window, jump BACK by
about L seconds to the spot that sounds most like where we are (log-spectrum similarity over
~2 s around the joint, then sample-accurate waveform alignment), with a short equal-power
crossfade. Same piece, same arc, just a few bars repeated where the film now holds longer.

  python3 tools/extend-music.py <in.mp3> <out.wav> '<jobs json>'
  jobs: [[tmin, tmax, Lmin, Lmax], ...] in ORIGINAL music seconds, in order.
Prints the chosen joints as JSON: [{"at": t, "back": L}, ...] (L = seconds the film must gain there).
"""
import json, subprocess, sys
import numpy as np

src, out, jobs = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
from pathlib import Path
if Path(out).exists():
    sys.exit("Output exists; choose a new path.")
if not jobs or any(len(j) != 4 or not (0 < j[2] <= j[3] < j[0] < j[1]) for j in jobs):
    sys.exit("Each joint needs 0 < Lmin <= Lmax < tmin < tmax.")
if any(a[0] >= b[0] for a, b in zip(jobs, jobs[1:])):
    sys.exit("Joint windows must be ordered.")
SR = 44100
raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"],
                     capture_output=True, check=True).stdout
X = np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
mono = X.mean(1)
if any(j[1] + 2 >= len(X) / SR for j in jobs):
    sys.exit("Joint windows need at least two seconds of audio after them.")

# log band spectrogram (hop 10 ms)
HOP, NF = 441, 2048
win = np.hanning(NF).astype(np.float32)
nfr = (len(mono) - NF) // HOP
spec = np.abs(np.fft.rfft(np.stack([mono[i * HOP:i * HOP + NF] * win for i in range(nfr)]), axis=1))
edges = np.unique(np.geomspace(2, NF // 2, 72).astype(int))
F = np.log1p(np.stack([spec[:, a:b].mean(1) for a, b in zip(edges[:-1], edges[1:])], 1) * 50)
F = F / (np.linalg.norm(F, axis=1, keepdims=True) + 1e-9)
fps = SR / HOP

picks = []
for tmin, tmax, lmin, lmax in jobs:
    best = (-1, 0, 0)
    for L in range(int(lmin * fps), int(lmax * fps) + 1):
        c = (F[L:] * F[:-L]).sum(1)                  # c[k] = sim(frame k+L, frame k)
        k = np.convolve(c, np.ones(200) / 200, "same")  # ~2 s around the joint
        for j in range(int(tmin * fps), int(tmax * fps)):
            if j - L < 0 or j - L >= len(k):
                continue
            if k[j - L] > best[0]:
                best = (k[j - L], j, L)
    _, j, L = best
    t, back = j * HOP, L * HOP
    # sample-accurate: align the waveform after the joint (+-15 ms)
    seg = mono[t:t + 4410]
    r = [float(np.dot(seg, mono[t - back + d:t - back + d + 4410])) for d in range(-660, 661)]
    back -= int(np.argmax(r)) - 660
    picks.append((t, back, best[0]))

# assemble: play to t, crossfade into t-back, carry on (25 ms equal-power)
XF = int(0.025 * SR)
fade = np.sin(np.linspace(0, np.pi / 2, XF))[:, None].astype(np.float32)
parts, pos = [], 0
for t, back, _ in picks:
    parts.append(X[pos:t - XF // 2])
    a = X[t - XF // 2:t - XF // 2 + XF] * fade[::-1]
    b = X[t - back - XF // 2:t - back - XF // 2 + XF] * fade
    parts.append(a + b)
    pos = t - back - XF // 2 + XF
parts.append(X[pos:])
Y = np.concatenate(parts)
subprocess.run(["ffmpeg", "-loglevel", "error", "-n", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-",
                "-c:a", "pcm_s16le", out], input=Y.astype(np.float32).tobytes(), check=True)
print(json.dumps([{"at": round(t / SR, 4), "back": round(b / SR, 4), "sim": round(float(s), 3)} for t, b, s in picks]))
print(f"# {len(X) / SR:.2f}s -> {len(Y) / SR:.2f}s", file=sys.stderr)

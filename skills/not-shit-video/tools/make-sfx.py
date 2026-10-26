#!/usr/bin/env python3
"""Synthesise original UI sounds; no sampled platform sound assets.
Usage: python3 tools/make-sfx.py out/sfx
"""
import sys, wave, numpy as np
SR = 48000
from pathlib import Path
out = str(Path(sys.argv[1]))
Path(out).mkdir(parents=True, exist_ok=False)

def write(name, x):
    x = np.clip(x / (np.max(np.abs(x)) + 1e-9) * 0.7, -1, 1)
    st = np.stack([x, x], axis=1)
    with wave.open(f"{out}/{name}.wav", "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())
    print("OK", name, f"{len(x)/SR:.2f}s")

def env(n, a, d):  # attack/decay in seconds
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)

rng = np.random.default_rng(7)

# send: soft upward air swoosh + tiny pitched tail
n = int(0.32 * SR); t = np.arange(n) / SR
noise = rng.standard_normal(n)
sweep = np.cumsum(np.interp(t, [0, 0.32], [900, 3200]) / SR)
band = np.sin(2 * np.pi * sweep) * noise
swoosh = np.convolve(band, np.ones(24) / 24, mode="same") * env(n, 0.06, 0.07)
tone = np.sin(2 * np.pi * np.cumsum(np.interp(t, [0, 0.32], [620, 980]) / SR)) * env(n, 0.005, 0.05) * 0.35
write("send", swoosh + tone)

# receive: two-note glassy pop (soft, low)
n = int(0.45 * SR); t = np.arange(n) / SR
p1 = np.sin(2 * np.pi * 880 * t) * env(n, 0.003, 0.06)
p2 = np.zeros(n); k = int(0.075 * SR)
p2[k:] = (np.sin(2 * np.pi * 1318.5 * t[: n - k]) * env(n - k, 0.003, 0.09))
write("receive", (p1 + 0.8 * p2) * (1 + 0.15 * np.sin(2 * np.pi * 2637 * t)))

# tick: tiny tactile click for chips/cards landing
n = int(0.08 * SR); t = np.arange(n) / SR
write("tick", np.sin(2 * np.pi * 1900 * t) * env(n, 0.001, 0.012) + 0.3 * rng.standard_normal(n) * env(n, 0.0005, 0.004))

# whoosh: wide, slow air move for window/phone transitions
n = int(0.9 * SR); t = np.arange(n) / SR
noise = rng.standard_normal(n)
lp = np.convolve(noise, np.ones(60) / 60, mode="same")
shape = np.sin(np.pi * np.clip(t / 0.9, 0, 1)) ** 2
write("whoosh", lp * shape)

# rec: start-recording blip
n = int(0.18 * SR); t = np.arange(n) / SR
write("rec", np.sin(2 * np.pi * 740 * t) * env(n, 0.004, 0.05))

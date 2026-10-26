#!/usr/bin/env python3
"""Find single-frame render glitches (a black window, a tiled mosaic) in a render.

Chrome's compositor occasionally hands Remotion a frame whose big transformed
window layer is unrasterised (black) or tiled with the wrong texture (a mosaic
of its own corner). Such a frame differs sharply from both neighbours while
the neighbours match each other. Prints the frame numbers, one per line.

  python3 tools/glitches.py <video.mp4> [max_run=3]
"""
import subprocess, sys
import numpy as np

W, H = 192, 108
video = sys.argv[1]
max_run = int(sys.argv[2]) if len(sys.argv) > 2 else 3
raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", video, "-vf", f"scale={W}:{H},format=gray",
                      "-f", "rawvideo", "-"], capture_output=True, check=True).stdout
F = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
n = len(F)
d = lambda a, b: float(np.abs(F[a] - F[b]).mean())
T = 4.0
bad = set()
for f in range(1, n - 1):
    if f in bad:
        continue
    for k in range(1, max_run + 1):
        if f + k >= n:
            break
        before, after, across = d(f - 1, f), d(f + k - 1, f + k), d(f - 1, f + k)
        if before > T and after > T and across < 0.35 * min(before, after):
            bad.update(range(f, f + k))
            break
for f in sorted(bad):
    print(f)
print(f"# {len(bad)} glitch frames of {n}", file=sys.stderr)

#!/usr/bin/env python3
"""Preserve the musical arc: measured constant gain, peak limiter, verified output."""
import argparse
import json
import math
from pathlib import Path
import re
import subprocess


def loudness(path):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(path), '-vn', '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True, check=True)
    matches = re.findall(r'^\s*I:\s*([\-\w.]+)\s+LUFS', r.stderr, re.M)
    if not matches:
        raise ValueError('No measurable audio stream.')
    value = float(matches[-1])
    if not math.isfinite(value) or value <= -70:
        raise ValueError('Silent or unmeasurably quiet audio; no normalisation applied.')
    return value


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('input', type=Path)
    p.add_argument('output', type=Path)
    p.add_argument('--height', type=int, choices=[720, 1080, 2160])
    p.add_argument('--target', type=float, default=-16)
    a = p.parse_args()
    if a.output.exists() or a.input.resolve() == a.output.resolve():
        p.error('Output must be a new file.')
    if not -30 <= a.target <= -9:
        p.error('Target must be between -30 and -9 LUFS.')
    source = loudness(a.input)
    a.output.parent.mkdir(parents=True, exist_ok=True)
    video = ['-vf', f'scale=-2:{a.height}:flags=lanczos', '-c:v', 'libx264', '-crf', '18', '-preset', 'fast', '-threads', '2', '-pix_fmt', 'yuv420p'] if a.height else ['-c:v', 'copy']
    subprocess.run(['ffmpeg', '-v', 'error', '-n', '-i', str(a.input), '-map', '0:v:0', '-map', '0:a:0', *video, '-af', f'volume={a.target-source:.3f}dB,alimiter=limit=0.794:attack=2:release=60:level=false', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', str(a.output)], check=True)
    measured = loudness(a.output)
    print(json.dumps({'source_lufs': source, 'gain_db': round(a.target-source, 3), 'output_lufs': measured, 'target_lufs': a.target}))
    if abs(measured - a.target) > 1:
        print('WARNING: limiter/encoding moved loudness more than 1 LU; review the mix instead of flattening its dynamics.')


if __name__ == '__main__':
    main()

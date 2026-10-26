#!/usr/bin/env python3
"""Time-labelled contact sheet. Uses Pillow, not an optional FFmpeg text filter."""
import argparse
import io
import json
from pathlib import Path
import subprocess
from PIL import Image, ImageDraw, ImageFont

p = argparse.ArgumentParser(description=__doc__)
p.add_argument('video', type=Path)
p.add_argument('output', type=Path)
p.add_argument('--columns', type=int, default=4)
p.add_argument('--rows', type=int, default=3)
a = p.parse_args()
if a.output.exists() or not 1 <= a.columns <= 8 or not 1 <= a.rows <= 8:
    p.error('Use a new output path and 1–8 rows/columns.')
info = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_streams', '-show_format', '-of', 'json', str(a.video)]))
duration = float(info['format']['duration'])
video = info['streams'][0]
w = 480
h = round(w * video['height'] / video['width'])
pad, label = 10, 30
sheet = Image.new('RGB', (a.columns * (w + pad) + pad, a.rows * (h + label + pad) + pad), '#111111')
draw = ImageDraw.Draw(sheet)
font = ImageFont.load_default(size=18)
count = a.columns * a.rows
for i in range(count):
    seconds = (i + 0.5) * duration / count
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-ss', str(seconds), '-i', str(a.video), '-frames:v', '1', '-vf', f'scale={w}:{h}', '-f', 'image2pipe', '-vcodec', 'png', '-'], timeout=30)
    frame = Image.open(io.BytesIO(raw)).convert('RGB')
    x, y = pad + (i % a.columns) * (w + pad), pad + (i // a.columns) * (h + label + pad)
    sheet.paste(frame, (x, y))
    draw.text((x + 6, y + h + 5), f'{int(seconds // 60):02d}:{seconds % 60:05.2f}', fill='#e3e9f2', font=font)
a.output.parent.mkdir(parents=True, exist_ok=True)
with a.output.open('xb') as output:
    sheet.save(output, format='PNG' if a.output.suffix.lower() == '.png' else 'JPEG')
print(a.output)

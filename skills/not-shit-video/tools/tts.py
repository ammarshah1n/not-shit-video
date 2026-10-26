#!/usr/bin/env python3
"""Explicitly opted-in voice generation. No keychain access, no automatic spending."""
import argparse
import json
import os
from pathlib import Path
import sys
import urllib.error
import urllib.request


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('lines', type=Path, help='JSON array of {file: "name.mp3", line: "text"}')
    p.add_argument('output', type=Path)
    p.add_argument('--allow-paid', action='store_true', help='Explicitly authorise billable provider calls')
    p.add_argument('--voice', default=os.environ.get('ELEVENLABS_VOICE_ID', 'pFZP5JQG7iQjIQuC4Bku'))
    p.add_argument('--model', default='eleven_turbo_v2_5')
    a = p.parse_args()
    if not a.allow_paid:
        p.error('No API call made. Review pricing/rights, then pass --allow-paid.')
    key = os.environ.get('ELEVENLABS_API_KEY', '').strip()
    if not key:
        p.error('Set ELEVENLABS_API_KEY in the environment. Never commit it.')
    if not a.voice.isalnum():
        p.error('Voice ID must be alphanumeric.')
    rows = json.loads(a.lines.read_text())
    if not isinstance(rows, list) or not rows:
        p.error('Expected a nonempty list of voice lines.')
    seen = set()
    for row in rows:
        if not isinstance(row, dict) or not isinstance(row.get('line'), str) or not row['line'].strip() or not isinstance(row.get('file'), str):
            p.error('Each item needs nonempty text and a filename.')
        name = row['file']
        if Path(name).name != name or '/' in name or '\\' in name or not name.endswith('.mp3') or name in seen or (a.output / name).exists():
            p.error('Use unique new .mp3 basenames; traversal/overwriting is forbidden.')
        seen.add(name)
    a.output.mkdir(parents=True, exist_ok=True)
    for row in rows:
        req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{a.voice}?output_format=mp3_44100_192',
            data=json.dumps({'text': row['line'], 'model_id': a.model, 'voice_settings': {'stability': 0.5, 'similarity_boost': 0.75}}).encode(),
            headers={'xi-api-key': key, 'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=90) as response:
                if not response.headers.get('Content-Type', '').startswith('audio/'):
                    raise ValueError('Provider returned a non-audio response; no output saved.')
                audio = response.read()
        except urllib.error.HTTPError as exc:
            sys.exit(f'Voice provider returned HTTP {exc.code}. No response body or credential printed; do not retry blindly (billing).')
        with (a.output / row['file']).open('xb') as f:
            f.write(audio)
        print(f'Saved {row["file"]} ({len(audio)} bytes). Listen before using it.')


if __name__ == '__main__':
    main()

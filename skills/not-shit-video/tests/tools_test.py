"""Synthetic local checks for finishing, sound synthesis, glitch detection and paid-call guards."""
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
import wave

ROOT = Path(__file__).resolve().parents[1]


def run(*args):
    return subprocess.run(list(args), cwd=ROOT, text=True, capture_output=True, check=True, timeout=60)


class Tools(unittest.TestCase):
    def test_sound_finish_storyboard_and_glitch_scan(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp)
            run(sys.executable, 'tools/make-sfx.py', str(out / 'sfx'))
            for name in ['send', 'receive', 'tick', 'whoosh', 'rec']:
                with wave.open(str(out / 'sfx' / f'{name}.wav')) as audio:
                    self.assertEqual(audio.getframerate(), 48000)
                    self.assertEqual(audio.getnchannels(), 2)
                    self.assertGreater(audio.getnframes(), 0)
            run('ffmpeg', '-v', 'error', '-f', 'lavfi', '-i', 'color=c=navy:s=320x180:r=30:d=3', '-f', 'lavfi', '-i', 'sine=frequency=440:duration=3', '-c:v', 'libx264', '-threads', '2', '-pix_fmt', 'yuv420p', '-c:a', 'aac', str(out / 'source.mp4'))
            report = json.loads(run(sys.executable, 'tools/finish.py', str(out / 'source.mp4'), str(out / 'finished.mp4')).stdout.splitlines()[0])
            self.assertLess(abs(report['output_lufs'] + 16), 1)
            run(sys.executable, 'tools/storyboard.py', str(out / 'finished.mp4'), str(out / 'sheet.jpg'))
            self.assertGreater((out / 'sheet.jpg').stat().st_size, 100)
            scan = run(sys.executable, 'tools/glitches.py', str(out / 'finished.mp4'), '12')
            self.assertEqual(scan.stdout.strip(), '')
            self.assertIn('0 glitch frames', scan.stderr)

    def test_paid_voice_is_blocked_without_opt_in(self):
        r = subprocess.run([sys.executable, 'tools/tts.py', 'does-not-exist.json', 'out/voice'], cwd=ROOT, text=True, capture_output=True)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn('No API call made', r.stderr)

    def test_music_extension_rejects_invalid_joints_before_reading_audio(self):
        r = subprocess.run([sys.executable, 'tools/extend-music.py', 'does-not-exist.mp3', 'unused.wav', '[[0,1,2,3]]'], cwd=ROOT, text=True, capture_output=True)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn('Each joint needs', r.stderr)


if __name__ == '__main__':
    unittest.main()

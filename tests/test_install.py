import importlib.util
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('installer', ROOT / 'install.py')
installer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(installer)


class Installation(unittest.TestCase):
    def test_install_is_complete_idempotent_and_preserves_unrelated_files(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp).resolve()
            unrelated = root / '.claude' / 'settings.json'
            unrelated.parent.mkdir()
            unrelated.write_text('{"keep":true}')
            dest = root / '.claude/skills/not-shit-video'
            installer.install(dest)
            self.assertTrue(installer.identical(installer.SOURCE, dest))
            installer.install(dest)
            self.assertEqual(unrelated.read_text(), '{"keep":true}')
            self.assertFalse((dest / 'node_modules').exists())
            self.assertTrue((dest / 'references/threejs/LICENSE').is_file())
            self.assertTrue((dest / 'template/Phone.tsx').is_file())

    def test_conflicts_require_update_and_backup_preserves_user_edits(self):
        with tempfile.TemporaryDirectory() as temp:
            dest = Path(temp).resolve() / '.pi/skills/not-shit-video'
            installer.install(dest)
            (dest / 'SKILL.md').write_text('user edits')
            with self.assertRaises(ValueError):
                installer.install(dest)
            self.assertEqual((dest / 'SKILL.md').read_text(), 'user edits')
            installer.install(dest, update=True)
            backups = list((dest.parent.parent / 'not-shit-video-backups').glob('*/SKILL.md'))
            self.assertEqual(len(backups), 1)
            self.assertEqual(backups[0].read_text(), 'user edits')
            self.assertTrue(installer.identical(installer.SOURCE, dest))

    def test_symlink_destination_is_rejected(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp).resolve()
            real = root / 'real'
            real.mkdir()
            (root / 'link').symlink_to(real, target_is_directory=True)
            with self.assertRaises(ValueError):
                installer.install(root / 'link/skills/not-shit-video')
            self.assertEqual(list(real.iterdir()), [])

    def test_cli_targets(self):
        for agent, subdir in installer.AGENTS.items():
            with self.subTest(agent=agent), tempfile.TemporaryDirectory() as temp:
                subprocess.run([sys.executable, str(ROOT / 'install.py'), '--agent', agent, '--project', temp], check=True, capture_output=True)
                self.assertTrue((Path(temp) / subdir / 'not-shit-video/SKILL.md').is_file())

    def test_source_cannot_be_install_target(self):
        with self.assertRaises(ValueError):
            installer.install(installer.SOURCE)

    def test_payload_contains_no_symlinks_or_runtime_output(self):
        files = installer.files(installer.SOURCE)
        self.assertIn(Path('SKILL.md'), files)
        self.assertFalse(any(p.name in {'.env', 'auth.json', '.DS_Store'} for p in files))
        for p in files:
            self.assertFalse(any(part in {'node_modules', '.venv', 'out'} for part in p.parts))


if __name__ == '__main__':
    unittest.main()

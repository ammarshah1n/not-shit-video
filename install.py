#!/usr/bin/env python3
"""Install the self-contained skill without altering an agent's config or secrets."""
import argparse
import datetime as dt
import filecmp
import hashlib
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / 'skills' / 'not-shit-video'
IGNORE = shutil.ignore_patterns('node_modules', '.venv', '__pycache__', '*.pyc', 'out', '.DS_Store')
AGENTS = {'claude': '.claude/skills', 'codex': '.agents/skills', 'pi': '.pi/skills',
          'cursor': '.cursor/skills', 'generic': '.agents/skills'}


def files(root):
    found = {}
    for base, dirs, names in os.walk(root, followlinks=False):
        base = Path(base)
        dirs[:] = sorted(d for d in dirs if d not in IGNORE(str(base), dirs))
        for name in dirs + names:
            if (base / name).is_symlink():
                raise ValueError(f'Symlink inside skill is not allowed: {base / name}')
        for name in sorted(set(names) - set(IGNORE(str(base), names))):
            p = base / name
            found[p.relative_to(root)] = p
    return found


def identical(a, b):
    af, bf = files(a), files(b)
    return af.keys() == bf.keys() and all(filecmp.cmp(af[k], bf[k], shallow=False) for k in af)


def install(destination, update=False):
    destination = Path(destination).absolute()
    for p in (destination, *destination.parents):
        if p.is_symlink():
            raise ValueError(f'Refusing a symlink installation path: {p}')
    if destination == SOURCE or SOURCE in destination.parents or destination in SOURCE.parents:
        raise ValueError('The install destination must be outside the source skill.')
    files(SOURCE)  # validate before copying
    if destination.exists():
        if not destination.is_dir():
            raise ValueError(f'Destination is not a directory: {destination}')
        if identical(SOURCE, destination):
            print(f'Already current: {destination}')
            return destination
        if not update:
            raise ValueError(f'Existing skill differs: {destination}. Use --update to preserve a backup and replace this pack only.')
    destination.parent.mkdir(parents=True, exist_ok=True)
    stage = Path(tempfile.mkdtemp(prefix='.not-shit-video-install-', dir=destination.parent))
    backup = None
    try:
        shutil.copytree(SOURCE, stage / 'skill', ignore=IGNORE)
        if destination.exists():
            stamp = dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
            # Backups live OUTSIDE skill discovery; otherwise agents load two copies.
            backup = destination.parent.parent / 'not-shit-video-backups' / stamp
            if backup.parent.is_symlink():
                raise ValueError('Backup directory must not be a symlink.')
            backup.parent.mkdir(parents=True, exist_ok=True)
            destination.rename(backup)
        try:
            (stage / 'skill').rename(destination)
        except BaseException:
            if backup is not None and not destination.exists():
                backup.rename(destination)
            raise
    finally:
        shutil.rmtree(stage)
    print(f'Installed: {destination}')
    if backup:
        print(f'Previous files preserved: {backup}')
    return destination


def setup(destination):
    if sys.version_info < (3, 12):
        raise ValueError('Rendering extras need Python 3.12 or newer. Instructions were installed; rerun --setup with a supported Python.')
    missing = [name for name in ('node', 'npm', 'ffmpeg', 'ffprobe') if shutil.which(name) is None]
    if missing:
        raise ValueError('Runtime setup needs these on PATH: ' + ', '.join(missing) + '. The skill was installed; no system package manager was run.')
    major = int(subprocess.check_output(['node', '-p', 'process.versions.node.split(".")[0]'], text=True).strip())
    if major < 20:
        raise ValueError('Node.js 20 or newer is required.')
    npm = shutil.which('npm')
    # npm lifecycle scripts are disabled. Browser installation is explicit below.
    subprocess.run([npm, 'ci', '--ignore-scripts', '--no-audit', '--no-fund'], cwd=destination, check=True)
    subprocess.run(['node', 'node_modules/playwright/cli.js', 'install', 'chromium'], cwd=destination, env={**os.environ, 'PLAYWRIGHT_SKIP_BROWSER_GC': '1'}, check=True)
    venv = destination / '.venv'
    subprocess.run([sys.executable, '-m', 'venv', str(venv)], check=True)
    py = venv / ('Scripts/python.exe' if os.name == 'nt' else 'bin/python')
    pip_command = [str(py), '-m', 'pip', '--disable-pip-version-check']
    if any(os.environ.get(k, '').lower().startswith('socks') for k in ('HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'http_proxy', 'https_proxy', 'all_proxy')):
        # Fresh pip lacks SOCKS support; pip 26.2.1 also has a SOCKS PoolKey
        # regression. Bootstrap a tested installer + PySocks IN THIS VENV only.
        if not shutil.which('curl'):
            raise ValueError('SOCKS setup requires curl. No proxy was bypassed.')
        wheels = [
            ('44/3c/d717024885424591d5376220b5e836c2d5293ce2011523c9de23ff7bf068/pip-25.3-py3-none-any.whl', '9655943313a94722b7774661c21049070f6bbb0a1516bf02f7c8d5d9201514cd'),
            ('8d/59/b4572118e098ac8e46e399a1dd0f2d85403ce8bbaad9ec79373ed6badaf9/PySocks-1.7.1-py3-none-any.whl', '2725bd0a9925919b9b51739eea5f9e2bae91e83288108a9ad338b2e3a4435ee5'),
        ]
        with tempfile.TemporaryDirectory(prefix='video-proxy-') as cache:
            for relative, expected in wheels:
                wheel = Path(cache) / relative.rsplit('/', 1)[1]
                subprocess.run(['curl', '--fail', '--silent', '--show-error', '--location', '--proto', '=https', '--max-time', '60', '--output', str(wheel), 'https://files.pythonhosted.org/packages/' + relative], check=True)
                if hashlib.sha256(wheel.read_bytes()).hexdigest() != expected:
                    raise ValueError('Proxy-support wheel failed its SHA-256 check.')
                subprocess.run([*pip_command, 'install', '--no-index', str(wheel)], check=True)
    subprocess.run([*pip_command, 'install', '-r', str(destination / 'requirements.txt')], check=True)
    subprocess.run([npm, 'run', 'check'], cwd=destination, check=True)
    print('Runtime ready. No paid services, credentials or global agent settings were touched.')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--agent', choices=['auto', *AGENTS], default='auto')
    parser.add_argument('--project', type=Path, default=Path.cwd(), help='Project root; default current directory')
    parser.add_argument('--global', dest='global_', action='store_true', help='Install for this OS user instead of one project')
    parser.add_argument('--update', action='store_true', help='Back up a differing existing pack before replacing it')
    parser.add_argument('--setup', action='store_true', help='Install locked npm dependencies, isolated Chromium and Python extras; needs network')
    args = parser.parse_args()
    base = (Path.home() if args.global_ else args.project).resolve()
    agent = args.agent
    if agent == 'auto':
        agent = next((a for a in ('claude', 'pi', 'codex', 'cursor') if (base / AGENTS[a].split('/')[0]).is_dir()), 'generic')
    folder = AGENTS[agent]
    if args.global_ and agent == 'pi':
        folder = '.pi/agent/skills'
    if args.global_ and agent == 'cursor':
        folder = '.cursor/skills'
    destination = install(base / folder / 'not-shit-video', args.update)
    if args.setup:
        setup(destination)
    print('Start a new agent session (Pi: /reload), then ask it to use not-shit-video. See SKILL.md for the production workflow.')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, subprocess.CalledProcessError) as exc:
        print(f'Install stopped: {exc}', file=sys.stderr)
        sys.exit(1)

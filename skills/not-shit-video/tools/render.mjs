#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const [composition, output, ...options] = process.argv.slice(2);
if (!composition || !output) throw new Error('Usage: node tools/render.mjs Film out/movie.mp4 [--scale=0.5] [--frames=0-119]');
const target = resolve(output);
if (existsSync(target)) throw new Error('Output exists. Choose a new filename; nothing was overwritten.');
if (options.some(x => /^(--browser-executable|--concurrency|--overwrite|--public-dir|--serve-url)(=|$)/.test(x))) throw new Error('Browser and concurrency are controlled here; edit the reviewed script deliberately.');
mkdirSync(dirname(target), {recursive: true});
const browser = process.env.VIDEO_BROWSER || chromium.executablePath();
if (!existsSync(browser)) throw new Error('Chromium missing. Run: npx playwright install chromium');
const still = /\.(png|jpe?g)$/i.test(target);
const args = [resolve(root, 'node_modules/@remotion/cli/remotion-cli.js'), still ? 'still' : 'render', resolve(root, 'template/index.tsx'), composition, target,
  `--browser-executable=${browser}`, '--log=info', ...(!still ? ['--codec=h264', '--concurrency=2', '--crf=18', '--x264-preset=fast'] : []), ...options];
const result = spawnSync(process.execPath, args, {cwd: root, stdio: 'inherit', timeout: 30 * 60 * 1000});
if (result.error) throw result.error;
process.exit(result.status ?? 1);

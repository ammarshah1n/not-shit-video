#!/usr/bin/env node
// Local-only, isolated headless capture. No personal browser/profile or production URL.
import {chromium} from 'playwright';
import {createServer} from 'node:http';
import {readFile, mkdir, writeFile, realpath, access} from 'node:fs/promises';
import {resolve, dirname, extname, sep, join} from 'node:path';
import {parseArgs} from 'node:util';

const {values, positionals} = parseArgs({allowPositionals: true, options: {
  seconds: {type: 'string', default: '3'}, fps: {type: 'string', default: '60'},
  width: {type: 'string', default: '1920'}, height: {type: 'string', default: '1080'},
}});
const [input, output] = positionals;
if (!input || !output || positionals.length !== 2) throw new Error('Usage: capture.mjs local-scene.html new-output-directory [--seconds 3 --fps 60 --width 1920 --height 1080]');
const [seconds, fps, width, height] = ['seconds', 'fps', 'width', 'height'].map(k => Number(values[k]));
if (![seconds, fps, width, height].every(n => Number.isFinite(n) && n > 0) || seconds > 600 || fps > 120 || ![fps, width, height].every(Number.isInteger) || width > 7680 || height > 7680) throw new Error('Invalid capture dimensions, duration or fps.');
const file = await realpath(input), root = dirname(file), out = resolve(output);
if (extname(file).toLowerCase() !== '.html') throw new Error('Input must be a reviewed local HTML scene.');
try { await access(out); throw new Error('Output directory already exists; choose a new one.'); } catch (e) { if (e.code !== 'ENOENT') throw e; }
await mkdir(out, {recursive: true});
const server = createServer(async (req, res) => {
  try {
    if (req.method !== 'GET') { res.writeHead(405).end(); return; }
    const url = new URL(req.url, 'http://localhost');
    const requested = url.pathname === '/' ? file : resolve(root, '.' + decodeURIComponent(url.pathname));
    const p = await realpath(requested);
    if (!p.startsWith(root + sep) || !['.html', '.js', '.mjs', '.css', '.json', '.png', '.jpg', '.svg', '.woff', '.woff2'].includes(extname(p))) { res.writeHead(403).end(); return; }
    const types = {'.html':'text/html', '.js':'text/javascript', '.mjs':'text/javascript', '.css':'text/css', '.json':'application/json', '.svg':'image/svg+xml', '.woff2':'font/woff2'};
    res.writeHead(200, {'Content-Type': types[extname(p)] || 'application/octet-stream', 'Cache-Control':'no-store'});
    res.end(await readFile(p));
  } catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
const blocked = new Set();
const deadline = setTimeout(() => { console.error('Capture exceeded 20 minutes.'); process.exit(1); }, 20 * 60 * 1000);
try {
  browser = await chromium.launch({headless: true, ...(process.env.VIDEO_BROWSER ? {executablePath: process.env.VIDEO_BROWSER} : {})});
  const context = await browser.newContext({viewport: {width, height}, deviceScaleFactor: 1, serviceWorkers: 'block', acceptDownloads: false});
  await context.route('**/*', route => {
    const url = route.request().url();
    if (new URL(url).origin === base) return route.continue();
    blocked.add(url.split('?')[0]);
    return route.abort();
  });
  await context.routeWebSocket('**/*', socket => socket.close());
  const page = await context.newPage();
  await page.clock.install({time: new Date('2026-01-01T09:00:00Z')});
  await page.clock.pauseAt(new Date('2026-01-01T09:00:01Z'));
  await page.goto(base, {waitUntil: 'load', timeout: 15000});
  await page.evaluate(() => document.fonts.ready);
  if (!await page.evaluate(() => typeof window.__renderAt === 'function')) throw new Error('Scene needs window.__renderAt(seconds). See references/capture.md.');
  const count = Math.round(seconds * fps);
  for (let frame = 0; frame < count; frame++) {
    if (frame > 0) await page.clock.runFor(Math.round(frame * 1000 / fps) - Math.round((frame - 1) * 1000 / fps));
    await page.evaluate(async t => {
      await window.__renderAt(t);
      for (const animation of document.getAnimations()) {
        if (animation.__filmStart == null) animation.__filmStart = t * 1000 - Number(animation.currentTime || 0);
        animation.pause(); animation.currentTime = t * 1000 - animation.__filmStart;
      }
      const canvas = document.querySelector('canvas');
      if (canvas) { canvas.style.width = '100vw'; canvas.style.height = '100vh'; }
    }, frame / fps);
    if (blocked.size) throw new Error('Scene requested external resources. Vendor approved assets locally before capturing.');
    await page.screenshot({path: join(out, `f-${String(frame).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 94, scale: 'device'});
    if (frame % fps === 0) console.log(`frame ${frame}/${count}`);
  }
  await writeFile(join(out, 'capture.json'), JSON.stringify({fps, width, height, frames: count, seconds: count / fps, network: 'local-only'}, null, 2) + '\n');
  console.log(`Captured ${count} deterministic frames.`);
} finally {
  clearTimeout(deadline);
  if (browser) await browser.close();
  await new Promise(r => server.close(r));
}

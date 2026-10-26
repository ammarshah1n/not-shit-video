import {spawnSync} from 'node:child_process';
import {mkdtempSync, readFileSync, readdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = mkdtempSync(join(tmpdir(), 'not-shit-video-smoke-'));
function run(command, args) {
  const result = spawnSync(command, args, {cwd: root, encoding: 'utf8', timeout: 180000});
  if (result.status !== 0) throw new Error(`${command} failed (${result.status}): ${result.stderr}\n${result.stdout}`);
  return result.stdout;
}
for (const name of ['a', 'b']) run(process.execPath, ['tools/capture.mjs', 'examples/graph.html', join(out, name), '--seconds', '0.2', '--fps', '30', '--width', '640', '--height', '360']);
const hash = p => createHash('sha256').update(readFileSync(p)).digest('hex');
const names = readdirSync(join(out, 'a')).filter(n => n.endsWith('.jpg'));
assert.equal(names.length, 6);
for (const name of names) assert.equal(hash(join(out, 'a', name)), hash(join(out, 'b', name)), 'capture repeatability');
assert.notEqual(hash(join(out, 'a', names[0])), hash(join(out, 'a', names.at(-1))), 'moving frames must differ');
run(process.execPath, ['tools/render.mjs', 'Film', join(out, 'poster.png'), '--frame=780', '--scale=0.25']);
run(process.execPath, ['tools/render.mjs', 'Film', join(out, 'motion.mp4'), '--frames=650-709', '--scale=0.25']);
const video = JSON.parse(run('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_streams', '-of', 'json', join(out, 'motion.mp4')])).streams[0];
assert.equal(video.nb_frames, '60');
assert.equal(video.r_frame_rate, '60/1');
assert.equal(video.width, 960);
assert.equal(video.height, 540);
console.log(`SMOKE PASS: identical deterministic captures; real Remotion poster and 60-frame H.264 render. Artifacts: ${out}`);

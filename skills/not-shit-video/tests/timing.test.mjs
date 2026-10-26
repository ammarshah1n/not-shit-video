import test from 'node:test';
import assert from 'node:assert/strict';
import {readingFrames, retime} from '../tools/timing.mjs';

test('reading time includes a full completed-text beat', () => {
  assert.equal(readingFrames('One two three four', 60, 4, 1), 120);
  assert.equal(readingFrames('One two three', 30, 3, 1), 60);
  assert.throws(() => readingFrames('x', 0));
});
test('capture retiming slows streaming and holds without reversing', () => {
  const points = [[0, 0], [100, 100], [500, 200], [800, 200], [900, 300]];
  assert.equal(retime(300, points), 150);
  assert.equal(retime(700, points), 200);
  assert.equal(retime(1000, points), 300);
  assert.equal(retime(-1, points), 0);
  assert.throws(() => retime(1, [[0, 0], [0, 1]]));
  assert.throws(() => retime(1, [[0, 2], [1, 0]]));
});

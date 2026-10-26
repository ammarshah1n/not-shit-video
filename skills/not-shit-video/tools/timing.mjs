export function readingFrames(text, fps = 60, wordsPerSecond = 4, holdSeconds = 1) {
  if (!Number.isFinite(fps) || fps <= 0 || !Number.isFinite(wordsPerSecond) || wordsPerSecond <= 0 || !Number.isFinite(holdSeconds) || holdSeconds < 0) throw new Error('Invalid timing.');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return Math.ceil((words / wordsPerSecond + holdSeconds) * fps);
}

/** Piecewise-linear film-frame -> captured-frame map. Equal source values create a hold. */
export function retime(frame, points) {
  if (!Number.isFinite(frame) || points.length < 2 || points.some(p => p.length !== 2 || p.some(n => !Number.isFinite(n) || n < 0)) || points.some((p, i) => i > 0 && (p[0] <= points[i - 1][0] || p[1] < points[i - 1][1]))) throw new Error('Invalid retime map.');
  if (frame <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [a, b] = [points[i - 1], points[i]];
    if (frame <= b[0]) return a[1] + (b[1] - a[1]) * (frame - a[0]) / (b[0] - a[0]);
  }
  return points.at(-1)[1];
}

# Deterministic capture, never a personal screen recording

## Standalone scene

`tools/capture.mjs` serves the reviewed HTML's directory on loopback, uses a fresh isolated headless browser context, blocks external requests, service workers and WebSockets, freezes the JS clock, invokes `window.__renderAt(seconds)` per frame and pins CSS animations to film time. It rejects existing output directories and writes a capture manifest only after success. Review local scene code first: browser isolation is not permission to execute hostile code.

```sh
node tools/capture.mjs examples/graph.html out/graph --seconds 13.5 --fps 60 --width 3840 --height 2160
ffmpeg -n -framerate 60 -i out/graph/f-%05d.jpg -frames:v 810 -c:v libx264 -threads 2 -crf 16 -preset fast -pix_fmt yuv420p -movflags +faststart out/graph.mp4
```

The example has a 4K backing canvas. The tool scales its CSS box to the viewport, so review frames do not accidentally crop to the top-left quadrant. Screenshots use device pixels and JPEG quality 94. For transparent/lossless scenes, adapt the output to PNG deliberately.

## Real application capture rig

A generic static HTML recorder cannot know your app's data contract. Build a thin PROJECT-LOCAL adapter, preserving the actual renderer:

1. Serve a local build. Vendor fonts/scripts; do not load production CDNs while claiming offline isolation.
2. Generate every fixture from one fictional persona. Intercept auth, REST, RPC, edge/API, realtime and analytics routes BEFORE navigation. Exact known routes return fixtures; every unknown/non-local request aborts. A catch-all that answers arbitrary API requests with `{}` hides missing fixtures.
3. Block service workers and WebSockets, downloads and external navigation. Never reuse browser profiles, storageState exports, cookies or an existing authenticated session.
4. Install the page clock before the app loads. Set locale, timezone, viewport, deviceScaleFactor and colour scheme explicitly. Allow deterministic startup steps and await fonts/renderer-ready signals.
5. Stub the application bridge, not the visible UI. Replay the real event shapes into the real renderer. Assert the fixtures still match current code; a stale fixture can make a beautiful false demo.
6. Drive every shot with frame-indexed events. A typical sequence: arm the scenario, perform a checked DOM click, step timers, flush UI commits, update CSS animation times, capture. For React inputs, use the native value setter then dispatch an input event.
7. Under a frozen clock, Playwright actionability may wait forever. Use `page.evaluate` to click a known element and FAIL if it is missing. This is fixture automation, never a permission/authentication bypass.
8. Time compression is allowed only when the on-screen elapsed counters follow the simulated clock. For readability, slow text afterward with a source-frame map; do not imply the real backend returned it faster.
9. Pin animations separately: pause each `document.getAnimations()` entry, save its film-time origin when first seen, set `currentTime` per frame. Otherwise spinners still depend on real GPU timing.
10. Assert visible DOM text contains only the fixture persona, no personal names/emails/identifiers. Assert expected desktop/glass classes and no retired/unshipped UI. Review actual screenshots too; DOM assertions cannot catch every leak.

## Resolution and glass

A representative desktop capture used 1600×1000 CSS pixels at deviceScaleFactor 2.4 = 3840×2400 pixels. Another used 2560×1440 at scale 2 = 5120×2880. Check actual encoded dimensions, not comments.

For native glass, derive the background behind the window from the SAME film wallpaper: crop to the window area, blur/tint it, then let the app's own translucent UI render over it. Draw the sharp wallpaper, outer frame and shadow in composition. Never copy a user's wallpaper or desktop.

## Acceptance

Correct class/layout; no private or forbidden text; fonts loaded; no blocked/missing requests; distinct frames through moving sections; duplicates only during intended holds; contact sheet legible at viewing size. Preserve a manifest with fps, dimensions, frame count and fixture revision. Do not call recorded mock traffic a production test.

# Recovered production lessons

These are the durable lessons, detached from private accounts and product code. Earlier runbooks are historical evidence, not instructions to revive old systems.

1. **Deterministic motion.** Real-time capture under load produced uneven effective frame rates and visible judder. Expose `__renderAt(seconds)` or render in Remotion. For 60 fps, render exactly `round(seconds * 60)` frames at `frame / 60`.
2. **The expensive wrong direction.** The graph-as-world 30-second teaser with three camera docks was rejected. The specific artistic reason was not recorded. Do not invent one. Retain the graph as a technique, not a default story or a proven successful template. The later accepted film used legible phone scenes and a continuous glass desktop.
3. **Two overlapping text systems.** A headline and a caption repeated the same claim and collided with the product. Render one or the other. Pin transformed screens below the headline-safe band.
4. **Text left too fast.** Slow the reveal AND hold the finished output. The final long film was almost two minutes because the result needed reading time. Re-time captured image sequences and extend music at real musical joints.
5. **Wrong pixel scale.** A high-DPI browser viewport is not a high-resolution screenshot if `scale: 'css'` is used. Set `scale: 'device'`, inspect output dimensions and compose at the intended delivery ratio.
6. **Viewport/canvas mismatch.** A fixed 3840×2160 canvas in a 1080p viewport may show only its top-left quadrant. Match the viewport or explicitly scale the canvas's CSS dimensions while keeping its backing resolution.
7. **CSS is a second clock.** Playwright's clock drives JS timers, Date, rAF and performance time; pause and set `document.getAnimations()` timelines separately. New CSS animations need an origin captured when they appear.
8. **Frozen-clock clicks hang.** Normal actionability waits can depend on rAF. For a deterministic fixture rig, perform a checked DOM click inside `page.evaluate`, or advance the clock deliberately. Never use this to bypass a real permission prompt.
9. **A 'video' can be a still.** One synchronous graph layout produced only a handful of distinct frames. Use a still plus motivated camera motion if that is what the actual product does; don't claim an animated capture.
10. **4K decode failures.** The older pipeline's video reader sometimes dropped/garbled frames. Image sequences fixed the decoding path, but compositor pressure could still create black/tiled frames. Keep concurrency low; inspect the FINAL encoded file.
11. **Longer glitches escape short scans.** Test multi-frame runs (3 and 12), not only isolated spikes. A heuristic cannot distinguish every intentional flash from a defect; review flagged frames and adjacent frames visually.
12. **Do not patch a storm one frame at a time.** If corruption is widespread, rerender the affected range in isolation. For sparse defects, rerender exact frames, replace only proven bad frames and verify the replacement export.
13. **Change only audio when only audio changed.** Re-render the mix and mux with copied picture. A scene duration, camera change or retime map requires rerendering picture.
14. **Pronunciation is an edit.** A product name can be mispronounced in isolation or before a consonant. Test the isolated word and the whole sentence; rewrite the phrase or phonetic spelling before switching voices. ASR is supporting evidence, not a listening claim.
15. **Fonts across workers.** Network font loading was unreliable. Bundle licensed fonts locally, await `document.fonts.ready`, or embed them. Do not redistribute proprietary system fonts. This template uses fallbacks and ships no font files.
16. **Version assets.** Give regenerated captures distinct filenames. Do not let an old same-name clip silently survive a render. Never montage a stale shared output directory; use a new directory or an explicit input list.
17. **FFmpeg zoompan.** With looping input use `d=1` and `-frames:v N`; `d=N` multiplies output duration per input frame. Check duration with ffprobe before continuing.
18. **Cursor transforms.** The cursor belongs inside the transformed screen, positioned by screenshot fractions. An independently transformed cursor slides off the target.
19. **No blanket proxy removal.** The old workstation had a proxy-specific API failure. Diagnose the active network; do not strip proxy variables by default or bypass required privacy routes.
20. **No vanishing masters.** Render outputs are large and ignored by git. Copy final masters to the chosen durable delivery folder before discarding a worktree. Verify size and playback; a symlink is not a backup.
21. **Public != private.** Real founders, messages, voices, personal names, account identifiers, product internals, music licences and signed URLs stay out of a public pack. A film may be suitable for private review but not publication.

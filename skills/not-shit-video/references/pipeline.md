# Reproducible production pipeline

## 1. Brief and proof

Read craft.md, story-and-brief.md and production-lessons.md. Establish one synthetic persona, a truthful claim table, the delivery aspect ratio and the disclosure boundary. Sketch the story and reading holds. Inspect opening/proof/close stills before building the entire film.

## 2. Assets

For real UI, capture a reviewed local application with deterministic fixtures (capture.md). For phone scenes, use template/Phone.tsx with frame-timed events and the real channel's contract. For 3D, examples/graph.html has a deterministic hook; see 3d.md. Keep licensed fonts and media local. No login cookies, customer files, private system prompts or signed URLs.

## 3. Compose

The template registers `Film`, 3840×2160, 60 fps, 1800 frames. It is a synthetic 30-second example, not the original private film or footage of a shipped product. `Phone.tsx` and `Type.tsx` preserve the recovered component mechanics; `Desktop.tsx` preserves the glass/continuous-container approach. Edit `Film.tsx` for the new story. Do not stretch the demo into every brief.

```sh
npm ci --ignore-scripts
npx playwright install chromium
npm run check
npm test
npm run still
node tools/render.mjs Film out/review.mp4 --scale=0.5
node tools/render.mjs Film out/master.mp4 --scale=1 --crf=16
```

Outputs must be new filenames. Rendering uses a separate headless browser, concurrency 2, no personal profile and no visible browser window. `VIDEO_BROWSER` can name a compatible installed browser executable if downloads are unavailable; do not attach to its normal user profile. Do not remove required proxies by default.

### Captured frames and retiming

Put JPEG frames under `public/captures/shot-id/f-00000.jpg`, contiguous from zero. `FrameSequence` accepts a folder, count and optional film-frame → source-frame mapping. Use the tested `retime()` helper from tools/timing.mjs. Example: `[[0,0],[100,100],[500,200],[800,200]]` plays normally to frame 100, slows the next 100 source frames across 400 film frames, then holds the final frame. Regenerate picture after changing any map, duration or camera.

Match the screenshot aspect ratio and image-sequence frame rate. A desktop capture may be 3840×2400 even when the final composition is 3840×2160; fit it intentionally, not by squashing it.

## 4. Sound and finish

The example is silent by default: no paid voice or music is secretly fetched. Generate original SFX, add authorised music/voice, align them to the actual edit and read sound.md. Keep a dry mix and a finished share copy. When only VO timing changes, render/mix audio separately and mux it with copied picture:

```sh
ffmpeg -n -i picture.mp4 -i mix.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -movflags +faststart final.mp4
```

Ensure the mix duration equals the film. Do not hide truncation using `-shortest` without checking it.

## 5. Verify and deliver

Run quality.md against the FINAL file. Deliver editable source, 4K master if requested, an appropriate viewing copy, a poster and a labelled storyboard sheet. Preserve the media in a durable delivery directory; git intentionally excludes generated frames/audio/video. Keep unfinished, concept and shipped-product claims distinct.

The included tests verify mechanics, not artistic success. No installer can guarantee the output of an arbitrary agent or replace a visual/audio review.

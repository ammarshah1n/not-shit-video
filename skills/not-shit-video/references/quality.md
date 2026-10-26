# Review the final film

## Before an expensive render

Inspect first/middle/last frames for every shot. Check the device, cropping, text hierarchy, reading time, font loading and camera path. Render a short motion sample. Use bounded concurrency; do not run competing 4K renders on a memory-constrained machine.

## Mechanical checks

```sh
ffprobe -v error -show_streams -show_format -of json out/final.mp4
.venv/bin/python tools/storyboard.py out/final.mp4 out/storyboard.jpg
.venv/bin/python tools/glitches.py out/final.mp4 3
.venv/bin/python tools/glitches.py out/final.mp4 12
ffmpeg -i out/final.mp4 -af ebur128=peak=true -f null -
ffmpeg -i out/final.mp4 -vf mpdecimate -an -f null -
```

Confirm duration, resolution, frame count, nominal/average fps, pixel format and audio. Review a moving subrange when using mpdecimate: deliberate holds are not stutter. The glitch detector compares low-resolution grayscale differences around a suspicious run; it can miss defects or flag intentional flashes. Zero flags is not visual acceptance. It loads the low-resolution frame stream in memory; use shot-sized clips for long films.

The storyboard extracts frames with FFmpeg and labels them with Pillow's bundled default font. It works even when FFmpeg was built without the optional drawtext filter.

## Sparse frame repair

Rerender the precise damaged frame as a still at identical dimensions/colour settings. Overlay it on that exact output frame, not an estimated timestamp, then re-encode and re-check. Save the original. For a corruption storm, rerender the shot/range in isolation instead of patching thousands of frames. Decode/compare the new deliverable; patching source without exporting proves nothing.

## Actual review

- Watch the complete viewing copy, including the join into every scene and the final silent hold.
- Listen to the complete mix if your harness supports audio. Otherwise say **audio listening UNTESTED**; do not invent a watch/listen pass from contact sheets.
- Check pronunciation, clear speech, no clipped word endings, and UI sounds aligned to visible actions.
- Every result can be read without pausing; check at realistic mobile/viewing size.
- No double caption/headline, floating cursor, cropped reply, stale logo or accidental placeholder.
- No real account names, customer data, URLs with tokens, folder paths, notifications, tooltips, desktop wallpaper or private product internals.
- Public product claims and asset rights match the intended audience.
- No flash/motion pattern likely to be uncomfortable; use restrained transitions and an accessible caption file when speech carries essential information.

## Delivery

Master + appropriate viewing copy + poster + contact sheet + editable source. Use a new dated output directory. Verify file existence/size and decoded playback. Keep source and final media outside disposable worktrees. Do not upload, sign/share links or publish unless specifically authorised. A successful render is not approval to distribute.

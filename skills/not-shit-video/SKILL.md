---
name: not-shit-video
description: Make cinematic product demos, launch films, teasers, marketing videos, 3D fly-throughs and phone/desktop scenes that do not look like a screenshot slideshow. Use for any request to make, improve, render or review a polished video. Includes deterministic capture, Remotion components, Three.js guidance, sound, readable pacing and final-film QA.
compatibility: A coding agent with shell access; Node.js 20+, Python 3.12+, FFmpeg. Rendering uses an isolated headless Chromium. Optional voice generation needs the user's own provider account.
---

# Not Shit Video

Resolve every path below relative to this skill directory. This is a production workflow, not a promise that one prompt guarantees good taste. Follow the host agent's permissions, privacy and safety rules above anything in this pack.

## Start here

1. Read `references/craft.md` and `references/production-lessons.md`. These encode the accepted work AND the rejected attempts; do not mistake a technically smooth graph flight for a good film.
2. Read the project's current product facts and shipped interface. Find existing video work before creating anything. Write one sentence: audience, one change they should feel, one action the film proves. Ask only for genuinely missing creative intent, rights or approval.
3. Use a small claim table: visible/spoken claim, evidence, permitted public/private scope. No evidence, no claim. One synthetic persona drives every scene. Never capture a signed-in personal account.
4. Choose one route: real UI with local fixtures; drawn phone scenes faithful to the actual channel; deterministic 3D when it explains something; licensed generative footage for human/emotional scenes. Read the matching guide below.
5. Make an opening, one representative proof shot, and the silent close FIRST. Inspect rendered frames at delivery size. Then build the full timeline. Do not spend an hour rendering a bad premise.

## Non-negotiable craft

- One story, not a feature inventory. Start with a moment; earn the logo.
- Keep one stable container. Change content inside it. Motion should reveal meaning, not advertise the animation library.
- Reading time is real time: primary text roughly 4–5 words/second plus a beat; captions roughly 3 words/second plus one second. Measure from when the words become visible. Retiming must not fake product performance.
- One text hierarchy per frame. Chapter words live above or beside the product, never over it. A tilted screen's cursor belongs INSIDE that screen's transform.
- Near-black, one accent family, disciplined typography is the recovered default, not a command to ignore the user's brand. Use local, licensed fonts. Reserve motion for the product; let brand cards hold.
- 60 fps means 60 deterministic frames per second, not a real-time recording labelled 60 fps. Randomness is seeded; time comes from frame number. CSS, JS timers and 3D simulation all need the same film clock.
- A single musical build, shaped to information density. Voice occupies only the parts that need it. Duck under speech. End in actual silence. Never redistribute stock/generated music without checking its rights.
- Inspect the FINAL encoded file, not only source stills. Contact sheets, frame checks, audio/loudness checks, pronunciation and an end-to-end watch all matter. Never claim to have listened if the harness cannot hear audio.

## Read by task

| Task | Guide |
|---|---|
| Story, positioning, truth, pacing | `references/craft.md`, `references/story-and-brief.md` |
| The complete recovered film grammar | `references/film-grammar.md`, `references/film-study-notes.md` |
| Rebuild/capture/render workflow | `references/pipeline.md`, `references/capture.md` |
| Phone, glass desktop, typed chapters | `template/Phone.tsx`, `template/Desktop.tsx`, `template/Type.tsx` |
| 3D / shaders / materials / camera | `references/3d.md`, then `references/threejs/INDEX.md` |
| Voice, music, UI sound, mix | `references/sound.md` |
| Character-consistent generated footage | `references/generative-footage.md` |
| Review, glitches, delivery | `references/quality.md` |
| Hard-won failures, rejected directions | `references/production-lessons.md` |

## Tools

- Install dependencies once: `npm ci` and `npx playwright install chromium` here. Python extras: create `.venv`, then its Python `-m pip install -r requirements.txt`. FFmpeg/ffprobe must already be available.
- `npm run check && npm test` validates the template and deterministic helpers.
- `npm run still` renders a representative example frame; `npm run demo` renders the 30-second synthetic example. Neither is evidence of a real product.
- `node tools/capture.mjs examples/graph.html out/graph --seconds 13.5 --fps 60 --width 3840 --height 2160` captures the preserved 3D scene. Headless only, local files only, network blocked, fresh output directory required.
- `tools/capture.mjs` also accepts local HTML with a `window.__renderAt(seconds)` hook. For a full application, use the fixture-clock recipe in `references/capture.md`; never point a generic recorder at production.
- `node tools/render.mjs Film out/master.mp4 --scale=1 --crf=16` renders the template. The demo's default composition is 3840×2160 at 60 fps; use `--scale=0.5` for a review copy.
- `.venv/bin/python tools/glitches.py out/master.mp4 12` flags suspicious frame runs, not proof of visual quality. `.venv/bin/python tools/make-sfx.py out/sfx` creates original UI sounds.
- `python3 tools/finish.py out/master.mp4 out/finished.mp4` applies one measured gain and a limiter, then reports the final loudness. `.venv/bin/python tools/storyboard.py out/finished.mp4 out/storyboard.jpg` makes a labelled sheet.
- Paid voice generation is opt-in only: `python3 tools/tts.py lines.json out/voice --allow-paid`. Requires `ELEVENLABS_API_KEY`, never reads a personal keychain.

## Deliver, don't drift

Produce the master, viewing copy, poster/contact sheet and editable source in the user's chosen workspace. Include the factual limitations and any unverified audio/rights/visual checks. Do not auto-publish, auto-send, buy credits or silently switch to live data. A private review link is not approval for public release.

> Historical analytical notes. Preserve the source caveat in the Apple section; do not pass it off as verified footage. These are references to study, not permission to copy footage, marks or music.

# FILM-NOTES — Raw per-film analysis
Studied 2026-07-29 via frame extraction (1fps full runtime + 10fps opening bursts + exact cut frames) and ffmpeg scene/audio analysis. Reference videos are not redistributed. Scene-cut threshold 0.3 — soft dissolves and continuous-motion transitions do NOT register as cuts, which is itself a finding (the best films move without cutting).

## Corpus + measured rhythm

| Film | File | Length | Hard cuts | ASL | Character |
|---|---|---|---|---|---|
| Apple "Scary Fast" event open (Oct 2023) | apple-scaryfast-open.mp4 (first 10 min) | 600s | 116 | 5.1s (opening film ~1.6s) | dark night keynote, montage → glides |
| The Browser Company — Dia teaser | dia-teaser.mp4 | 78s | 40 | 1.90s | live-action narrative + type cards |
| Linear — "Intro to Linear" | linear-intro.mp4 | 241s | 16 | 14.2s | 3-minute cutless UI walkthrough core |
| Raycast — "New Raycast. Coming 2026" | raycast-teaser.mp4 | 39s | 5 | 6.4s | dark-glass macro teaser, loudest mix |
| Screen Studio promo | screenstudio-promo.mp4 | 45s | 19 | 2.3s | machine-gun cluster then 28s cutless |
| Superhuman — "Introducing Superhuman" | superhuman-intro.mp4 | 75s | 24 | 3.0s | cinematic landscapes + UI-in-world |
| OpenAI — "Introducing ChatGPT Atlas" | openai-atlas.mp4 | 98s | 6 | 14.0s (one 49s shot) | continuous glide over live UI |
| Vercel — Next.js Conf 2024 opening film | vercel-nextconf24-open.mp4 (first 4.5 min; film = 0–70s) | 70s film | 6 | 33.8s (19.6s opening shot) | abstract 3D metaphor world |

---

## 1. The Browser Company — "Dia | Never Explain Yourself Again" (78s, 41 shots, ASL 1.90s)

**Opening hook (0:00–0:03).** Wordless extreme close-up: hands chopping garlic on a wood board in warm kitchen light. No logo, no context, first cut already at 2.75s. The hook sells a *life moment in progress*, not the product.

**Camera.** Handheld with visible micro-shake throughout. Two lens registers used as emotional code: calm rectilinear intimacy for domestic beats; wide/fisheye distortion reserved for the panic/chaos beats (18–32s), which bows ceilings and doorframes. One whip-pan whose motion blur bleeds across a hard cut (49.3s) so the cut hides inside movement.

**UI treatment — the film's core trick.** Two registers, cut against each other: (a) the *generic competitor AI* is shown practically — real HP laptop, bezel, counter reflections, cluttered kitchen (cut_009); (b) *Dia itself* is shown as bezel-less floating rounded cards on pale mint, no camera artifacts, real favicons of the user's actual open tabs resolving an autosuggest. The framing/temperature shift IS the comparison argument; zero comparative copy.

**Typography.** Two systems: live letter-by-letter typing with blinking caret inside UI (paced to reading speed), and hard-cut static white-on-black interstitial cards ("If it's in your tabs" → "Dia already knows") — one declarative fragment per card, 1.5–3s each, no motion. Brand cards have no grain/vignette — a clean break from the filmic footage.

**Color/light.** Warm golden filmic grade + grain + rounded-corner home-movie vignette for life; cool mint-white for product UI; pure clean black only for brand cards. Three registers, never mixed.

**Rhythm.** Sub-1.5s cuts cluster on chaos (multi-angle near-duplicate coverage of one panicked beat, almost bullet-time); the longest shots (7s slow-motion dish handoff at 56.4s) are reserved for emotional payoff. Audio constant ~-20dB, silence only in last 2s.

**Beat sheet.** 0–3 hook / 3–13 problem (generic AI typed query) / 13–34 tension (family scramble, multi-angle panic) / 34–40 reveal (Dock icon zoom onto Dia) / 40–49 feature run (tab-aware suggest) / 49–64 payoff (slow-mo dish, tagline) / 64–78 end card + fade to silence.

**Most stealable.** The physical-to-graphic UI bridge: film the "old way" practically (bezels, reflections, mess), then cut the product reveal to an idealized bezel-less floating UI in a different color temperature. The register shift makes the argument wordlessly.

---

## 2. Raycast — "New Raycast. Coming 2026" (39s, 6 shots, ASL 6.4s, loudest mix of the corpus)

**The closest aesthetic reference to the recovered dark-glass house style.**

**Opening hook (0–3s).** ~1.3s of pure near-black with two soft diagonal light streaks sweeping a glossy obsidian surface — a held breath, no UI, no logo. At ~1.4s the signature search pill *materializes out of the black glass*, blinking caret, placeholder text fading in letter-by-letter. The hook is "an interface breathes into existence out of black glass."

**Camera.** No free 3D camera. Three motion substitutes: (a) the whole capture plane sits at a slight diagonal tilt with a beveled reflective edge always bleeding into frame-left — implied 3D without any 3D; (b) frame-creep: slow pans across canvases much larger than the viewport (13.6s emoji-grid shot) so the product feels unbounded; (c) UI-morph in place — mic icon literally becomes a waveform bar. Motion is morph + creep, not camera flight.

**UI treatment.** Never a full clean screenshot. Always cropped tight, off-axis, mid-interaction: a hotkey being recorded live (⌥⌘V → green "Saved ✓"), lists filtering live, an AI chat stacking tool-call rows (Linear → GitHub → note creation) in real time. Window chrome appears exactly once and even then is cropped.

**Typography.** Product text uses only native app affordances (autocomplete, streaming rows). Brand copy is small monospace/typewriter, two-column "NEW | <feature>" with hard swaps — LAUNCHER DESIGN → HOTKEY RECORDER → VOICE FEATURES → CLOUD SYNC ENGINE → RAYCAST → "NEW RAYCAST / COMING 2026" (second line italic). Zero animation on type; all motion budget spent on product UI.

**Color/light.** Desaturated near-black + cool gray speculars; the only saturated color = tiny punctuation (emoji focus ring cycling orange → mint → white, hex color chips, one green success state). Final card is hard white-on-black, no gradient — a reset.

**Rhythm vs music (measured).** All 5 hard cuts land within ~0.25s of an audio peak cluster (5.67/8.9/22.47/26.17/28.27 vs peaks at 5.0–5.5, 8.25–9.5, 21.25–22.75, 26.0–26.25, 28.0–28.75). The loudness (-10dB RMS) is carried by continuous in-shot motion, not cut frequency. 26.17–28.27s: rapid text-card swaps function as edit-rhythm without hard cuts. Last 6s: music drops away exactly on "COMING 2026" → silent white logo on black. Loud+dense → text flicker → total silence.

**Withhold ratio.** Extremely high: every NEW feature is named as a text card and never demonstrated; all demonstrated UI is *existing* functionality used as a credibility sizzle. It borrows trust from the present to sell an unseen future.

**Most stealable.** (a) The materialize-from-black-glass open; (b) the traveling color-cycling focus ring that hops cell-to-cell across a static grid on the beat — attention direction as rhythm device, pure post-effect.

---

## Measured beat-alignment note (Atlas)

OpenAI Atlas: audio builds from -29dB to a sustained 0dBFS peak run at 38–57s that sits ENTIRELY inside the single 49-second cutless shot (23–72s). The climax is carried by camera/UI motion and music alone; cuts (72.3s, 86.5s) only return once the music resolves quietly. Anti-cut climax design.

---

## 3. Screen Studio — "Beautiful Screen Recording in Minutes" (45s, 20 shots)

**Opening hook (0–3s).** Locked-off wide of a moody warm-dark creator desk; props *materialize into the frame* one by one (lamp glow, keyboard, mic, iPhone, papers) on a static shot — clutter builds compositely while VO sets the pain: "This is what presenting your screen usually feels like." Problem-first cold open; product absent.

**The two-regime edit — the film's whole argument.**
- 5.9–14s: machine-gun cluster, 18 cuts in 8s, some 0.17s apart — typing macros from 3+ angles, eye/glasses reflections as recurring punctuation, tripod rigging, QuickTime menu (the real competitor), a Dock full of Photoshop/Lightroom/DaVinci, an editing timeline labeled "WHOOSH-…". Cuts shrink toward the end, mimicking rising panic; audio loudens to -11dB simultaneously. Sub-second cuts aren't read, they're *felt* as friction.
- 14–42.7s: ZERO cuts for 28 seconds. One continuous virtual push-in through a fixed glowing vignette (near-black top, amber band, saturated green base); real UI panels fly toward the lens in staggered z-depth like cards being dealt, 2–3 overlapping so the tour reads as one place. Text-then-evidence rhythm: bold centered headline holds ~2s, then the proving UI card flies in — repeated 5–6 times with zero variation.

The edit trains you: many cuts = the old way, one long take = the product. The transition style IS the demo (the product's pitch is literally "auto-zoom so you never cut").

**UI treatment.** Never flat screenshots — floating cards with shadow, slight tilt, entering mid-flight, real creator content inside (webcam bubble, real dock, real export sheet).

**Type.** Word-by-word captions bottom-third in the problem section; bold centered 2-line max feature headlines in the product section. End card: pure black + purple ring mark — hard palette reset.

**Most stealable.** Match the edit grammar to the product's core mechanic and let the transition itself be the demo; contrast with ONE dense multi-cut "before" cluster so the later absence of cuts reads as relief.

---

## 4. Superhuman — "Introducing Superhuman" (75s, 25 shots, ASL 3.0s)

**Opening hook (0–8.4s, one continuous shot).** Blue-hour aerial over wet black-sand beach (Vestrahorn, Iceland), mountain reflected in sand. Thin white type builds phrase-by-phrase: "What would you do" → "with an extra 2 hours" → "every day?" → clears → SUPERHUMAN wordmark, letterspaced, same shot still holding. Pure emotional priming; zero product for 8+ seconds.

**Camera — two registers, never mixed within a shot.** Landscapes: near-static drone drift / timelapse (the *world* moves, not the camera). Product: slow orbital/tilting dolly around a static device, macro grazes along a phone bezel, rack focus bezel→screen. The UI never animates its container; the lens revolves around it.

**UI treatment — the signature.** Never flat-on, never full-frame. Screens at a raking 15–30° angle, razor-sharp, against heavily defocused saturated environment footage (desert dusk, teal pool, snow forest) — the SAME footage family as the b-roll cutaways, so product and world are optically fused in one frame instead of intercut. Constant real-world scale-jumping (full laptop → 2x phone-edge macro → 8-keys-tight keyboard). Features shown as diegetic in-context UI state changes (natural-language "9am Tokyo" parse; "Is this an intro? Move Allie to BCC") — never callout boxes or arrows.

**Typography.** Emotional word cards (thin grotesk, white on pure black: "Powerful", "Blazingly Fast") as beat punctuation; taglines split ACROSS consecutive shots so the cut completes the sentence ("Wind back time for what matters" → "what matters"); a giant outline "100" treated as a graphic object with a product shot crossing in front of it.

**Color/light.** Each product beat gets its own color world (desert pink → teal pool → snow blue → forest green); black word cards as contrast resets between them. Audio flat ~-18dB throughout — color and light carry the dynamics, not the mix.

**The 62.8–64.5s machine-gun cluster.** 8 cuts in 1.7s: torii gate → cat/butterfly → night sky → HK neon → Alhambra → puffins → B&W whale tail → dark phone. A global-montage crescendo compressing "everything you'd do with your time back" into one visceral burst immediately before the resolve to logo. The only passage that feels like that in the whole film.

**Most stealable.** Optical fusion: comp the UI as a sharp plane at 20–30° with matched-palette b-roll blurred behind it at f/1.4-equivalent, slow orbital camera around the plane; each UI beat gets its own background color world.

---

## 5. Vercel — Next.js Conf 2024 Opening Film (~70s film, 7 shots, 19.6s cutless opening)

**Opening hook (0–4s).** Pure black, static white "Next.js CONF 24" lockup, TOTAL SILENCE, zero motion for 4 seconds. The stillness is the hook — it trains the eye that something is coming precisely because nothing happens. Score starts ~4s and camera motion begins simultaneously.

**The 19.6s cutless scale-reveal.** Opens macro-tight on ONE glowing blue glass cube (scale ambiguous), pulls back and cranes up: the cube resolves into the crown of a branded skyscraper in a full CG night city; keeps climbing until a low hero angle on the "N" tower with a warm dusk sky behind. Sustained cutlessly via (a) constant forward/upward momentum, never a full stop; (b) staged reveals nested inside one move (abstract shape → skyline → tower → signage → voxel lattice) — internal beats without edits; (c) foreground brand-cube particles drifting past the lens at a different speed than mid/background — parallax depth on one spline camera.

**Product representation.** ZERO literal product — no code, no UI. The brand mark is architectural signage; the cube/voxel motif is the sculptural material of the whole world (a bridge de-renders into blue cubes; cubes self-assemble into a giant volumetric "NEXT"). Product communicated as metaphor: composable building blocks.

**Typography.** Flat static lockup as bookends; middle = kinetic glitch type ("everybody can cook." orbiting the tower mirrored/chromatic-aberrated) and extruded 3D letterforms built FROM the brand cubes; resolves back to flat type via letter-by-letter typewriter build — a closed loop to the opening card.

**Color.** Six distinct acts: black/white card → deep indigo night city with cyan glow → warm dusk pink behind black tower → red/teal glitch duotone (bridge) → bright pale studio macro (logo assembly, a hard tonal reset that reads as product hero shot) → black, then blue LED live stage.

**Rhythm vs music (measured).** Silence = stillness. Build = one withheld cut for 19.6s. First loud window (28–35s): cut rate accelerates INTO the drop (4.9s → 5.4s → 3.4s gaps). Second loud window (52–66s): no cuts at all — a sustained hero hold. Loud = either accelerating cuts or a long hero shot, never a fixed cadence.

**Handoff.** The rotating brand cube is reused one final time to reveal the speaker's pixelated portrait + typed name, widening to the real stage — the cut to live camera reads as the film's final beat, not a segment break.

**Most stealable.** The macro-to-monument scale reveal inside one uncut push: open tight/ambiguous on the brand's core object, pull back until it's revealed as the crown of something monumental; time the "wait, that's huge" moment to the music's first swell. One hero asset + one spline camera + parallax particles = premium.

---

## 6. Linear — "Intro to Linear" (241s, 16 hard cuts, 179s cutless demo core)

**Opening hook (0–3s).** Cold open on a HUMAN face mid-sentence (founder, warm home-office set) — no slate, no logo. Brand sting arrives 1.6s late: icon resolves, wordmark fades in beside it with a small overshoot, holds to 5.7s, then back to the human.

**The 179s "one take" (43.7–222.9s) — how it's actually built.** Not a camera move; a live cursor-driven screen recording of the real app (visible typing cadence, dropdowns, scrolls, hovers) stitched from many discrete segments whose joins are hidden inside the product's own transitional iconography: ~6–15-frame inserts of the app's real loading spinner (~86s), a blue checkmark (~92s), or a clean black frame (~182s). Because the bridge reads as "the app is doing something," a scene change launders into uninterrupted real use — invisible to both viewers and the scene-cut detector.

**Pseudo-zoom via chrome-crop.** The window periodically loses its macOS chrome and goes edge-to-edge for a beat (issue-detail scroll ~s114), then regains it — reads as a camera push-in with zero pan/zoom keyframes.

**UI treatment.** 100% real captured footage at ~1:1 scale, floating rounded window at ~65–70% frame width on a flat near-white stage, generous negative space, no gradients or desk context. Legibility over cinema. Data visibly PROGRESSES when a screen is revisited later (roadmap % complete moved) — time passing inside one session.

**Typography.** Zero overlaid marketing copy or captions anywhere. The only designed type is the wordmark bookends; otherwise the product's own interface type speaks.

**Editing rule.** Cuts are reserved exclusively for HUMAN ↔ PRODUCT alternation (11 fast cuts in the first 38s for credibility; a closing clutch at 222–235s that revisits the opening screen as a callback). Inside the walkthrough, cutting is suppressed entirely.

**Beat sheet.** 0–1.5 human cold open / 1.6–5.6 brand sting / 5.7–43.7 interview + proof cuts / 43.7–222.9 the unbroken demo / 222.9–235 wrap-up callback / 235–241 logo sting.

**Most stealable.** Hide edit points behind the product's own transition iconography (6–15 frames of its real spinner/checkmark/blackout) so a stitched demo reads as one continuous live session.

---

## 7. OpenAI — "Introducing ChatGPT Atlas" (98s, 7 shots, one 49.3s take)

**Opening hook (0–3s).** White void; a macOS Dock materializes and simply HOLDS (burst frames 0–2s near-identical), then a slow push-in isolates the single dark-blue Atlas icon. The hook is calm confidence inside familiar OS chrome — "it lives on your Mac" — not kinetics.

**Camera.** No photographed space at all; camera language is simulated purely via scale (push-in at open, mirror-image pull-out at close) and cross-dissolve. Nothing whips. What ramps is EDIT TEMPO inside the long take, not camera speed.

**The 49.3s take (23.0–72.3s) — the film's whole essay.** The outer container (browser frame + fixed-geometry right chat sidebar) is held perfectly constant in position and size while the CONTENT cross-dissolves through eight unrelated capability vignettes (Vrbo hikes → Coursera → WSJ simplify → United gate Q&A → email rewrite → tab re-open → Instacart agent). The brain tracks the container as continuity, so eight demos read as one live session; no scene-detector fires.

**Audio-tempo coupling (measured).** Music climbs from -29dB to a sustained ~0dBFS peak at 38–57s — exactly the highest scene-turnover stretch (new vignette every 2–3s), all inside the uncut take. Then the film downshifts to the longest vignette (agent mode ~16s) and resolves to a blank white screen + one status line ("All set.") as the music goes quiet. Loudness tracks information density, not cuts.

**UI treatment.** Real functioning UI at native scale, full-bleed; the only "environment" is a soft blue→lavender→peach gradient confined strictly to Atlas's own chrome (icon glow, outer vignette). Third-party sites keep native palettes untouched — "your content stays honest; our chrome carries the identity."

**Typography.** One grotesk, black on white, always centered, always a left-to-right typed build (never a fade). 1–3-word capability titles ("Assists," "Takes action for you") act as chapter markers INSIDE the long take.

**Beat sheet.** 0–14 materialize + push-in + name card / 14–23 orientation cuts / 23–72 the take / 72–86.5 pull-out, cart completes / 86.5–98 tagline → icon shrinks (mirrors open) → URL + Download.

**Most stealable.** Freeze the container, dissolve the content: lock one UI frame's geometry and splice unlimited unrelated feature demos inside it with dissolves — the viewer reads one unbroken live session.

---

## 8. Apple — "Scary Fast" event, first 10 minutes (600s, 116 cuts; opening montage ASL ~1.6s, product segments ~5s)

**Source caveat (honest).** The first ~100s is a bright, fast customer-work montage (scientist, astronomer, coaches, streetwear designer, a script page reading "No one works harder than…", an anime clip as on-screen creator content). The frame analyst flagged it as possibly mismatched source; my read is that it is plausibly Apple's real "people doing great work on Mac" cold-open montage, but treat 0–100s as UNVERIFIED for shot-for-shot citation and re-check against the official upload before quoting it. Everything from ~100s on is unambiguously genuine Scary Fast material and is where the useful dark-film craft lives.

**Verified dark-film craft (t≈100–600s):**
- **Palette.** Near-monochrome charcoal/graphite set — floor, walls, ceiling one material family; lit almost entirely from a coffered ceiling grid of small square panels; skin + a navy jacket are the only warm elements. Nothing flat-lit; every frame has one clear key source; deep background allowed to fall to true black. Night exteriors (Apple Park aerial through fog ~179s, dark hallway dolly ~249s) keep only a handful of practical light points against near-total black.
- **Graphics language.** Chip/data shown first as texture — extreme macro of glowing circuit tiles (~349s) before any full product form. Charts are chrome-less: pure-black cards, axis labels only, one saturated accent line (cyan→violet) per series ("Industry-leading performance per watt" ~407s, M3 GPU line chart ~500s+). Product family = evenly-lit render array on pure black, every screen carrying the same aurora wallpaper so the lineup reads as one organism (~199s).
- **Camera.** Slow motivated drone/crane pushes outside; inside, the classic Apple grammar: static presenter dead-center, small in oversized negative space, symmetric prop tables two stops under the subject, camera drifting slowly while the subject holds still. Environment does the storytelling.
- **Rhythm.** Montage cuts every 1–2s while music builds; after the music peak (~130–165s, -11dB) everything settles into glide-and-hold: 5–10s presenter shots punctuated by 1–2s macro/graphic cutaways timed to spoken beats. Fast = anticipation; slow = authority.
- **Typography.** One statement per card, thin/regular sans, white on pure black, 2–4s holds, simple fade/cut — text NEVER overlaps a live shot; it always gets its own black card.

**Most stealable (dark premium).** (a) The chrome-less black data card with a single gradient accent line — numbers as cinema; (b) texture-before-form product reveals (macro glow first, full object later); (c) the settle: fast montage while music builds, then long confident holds once the voice takes over.

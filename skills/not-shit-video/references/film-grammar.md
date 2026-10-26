> Recovered craft research, dated 2026-07-29. Measurements are historical observations, not newly re-verified benchmarks. No reference-film footage is included.

# DEMO FILM GRAMMAR SHEET
Cross-film synthesis from frame-level study of 8 acclaimed software launch films (2016–2026). Evidence base: 1fps full-runtime frame extraction + 10fps opening bursts + exact cut-frame extraction + ffmpeg scene-cut and audio-loudness measurement. Per-film raw notes: `FILM-NOTES.md` (same directory; source videos are not redistributed).

Corpus: Apple "Scary Fast" event open (2023) · TBC Dia teaser (2025) · Linear "Intro to Linear" · Raycast "New Raycast. Coming 2026" · Screen Studio promo · Superhuman "Introducing Superhuman" · OpenAI "Introducing ChatGPT Atlas" (2025) · Vercel Next.js Conf 2024 opening film.

**The single biggest cross-film finding, stated once:** the most cinematic films in this corpus are the ones that cut LEAST. Atlas: 7 shots in 98s with a 49s unbroken take carrying the musical climax. Vercel: a 19.6s cutless opening and a loud section with zero cuts. Linear: 179 seconds of "one take." Raycast: 6 shots in 39s. Cuts, where they exist, land within ~0.25s of audio peaks (measured on Raycast: all 5 cuts). Fast cutting appears ONLY as a rhetorical device meaning "the old way / chaos" (Screen Studio's 18 cuts in 8s, Dia's panic montage, Apple's anticipation montage). A screenshot slideshow fails not because it lacks cuts but because it lacks *continuous motivated motion between and inside moments*.

---

## CAMERA & MOTION

**1. Freeze the container, dissolve the content** — Atlas 23.0–72.3s (the 49s take).
Lock one UI frame's exact geometry (window + fixed-width sidebar) and never move it; cross-dissolve entirely different feature demos INSIDE it. The viewer's brain tracks the container as continuity and reads eight unrelated demos as one live session. The core discovery of the corpus: continuity is a property of the frame, not the footage.

**2. Macro-to-monument scale reveal in one uncut pull** — Vercel 4–19.6s.
Open tight on the brand's core object at ambiguous scale (one glowing cube), pull back/crane up until it resolves as the crown of something monumental (a skyscraper in a night city). Time the "wait, that's huge" beat to the music's first swell. One hero asset + one spline camera + foreground parallax particles drifting past the lens at a different speed = premium depth for cheap.

**3. Simulated camera: scale + dissolve, never velocity** — Atlas throughout; Raycast throughout.
Neither film has a real 3D camera. Atlas: push-in at open, mirror pull-out at close, nothing else. Raycast: a tilted capture plane with a reflective beveled edge bleeding into frame (implied 3D with zero 3D), slow frame-creep across canvases larger than the viewport, and UI that morphs in place (mic icon → waveform). Energy comes from *what changes*, not how fast the camera flies.

**4. Orbit the static UI plane / optical fusion** — Superhuman 22–52s.
UI as a razor-sharp plane at a raking 15–30° angle; heavily defocused, color-saturated environment behind it drawn from the SAME footage family as the b-roll — product and world fused optically in one frame instead of intercut. Camera slowly orbits/dollies around the static screen; macro grazes along hardware edges; rack focus bezel→screen. The UI never animates its container; the lens revolves around it.

**5. Pseudo-zoom by chrome-crop** — Linear ~s114 vs s108/s138.
Drop the window chrome and go edge-to-edge for a beat, then restore it. Reads as a camera push-in with zero pan/zoom keyframes.

**6. Two lens registers as emotional code** — Dia (rectilinear calm vs fisheye panic, 18–32s); whip-pan motion blur bleeding across a hard cut (49.3s) so the edit hides inside movement.

**7. The confident hold** — Atlas 0–2s (Dock materializes and just SITS); Vercel 0–4s (static lockup in silence); Apple presenter wides (5–10s holds). Premium = daring to not move.

## EDITING & RHYTHM

**8. Cut on the peak; climax without cuts** — measured.
Raycast: all 5 cuts within ~0.25s of an audio peak cluster. Atlas: the sustained 0dBFS peak run (38–57s) sits ENTIRELY inside the uncut take — the climax is carried by content turnover and music, cuts only return once the music resolves. Vercel: first loud window = cuts accelerating INTO the drop (4.9s→3.4s gaps); second loud window = one sustained hero hold. Rule: when cutting, cut on hits; at the climax, stop cutting and accelerate the content instead.

**9. Loudness tracks information density, not shot changes** — Atlas.
The music peak coincides with the highest vignette-turnover (new context every 2–3s inside the take), then the film downshifts to its LONGEST vignette as the music resolves. Score the content curve, not the cut list.

**10. Edit grammar as argument: many cuts = problem, cutless = product** — Screen Studio 5.9–14s vs 14–42.7s; Dia's panic montage vs 7s slow-mo payoff; Linear (cuts reserved exclusively for human↔product alternation, suppressed inside the demo).
Screen Studio is the purest case: 18 cuts in 8 seconds of tripods/QuickTime/timeline chaos, then 28 seconds without a single cut once the product appears — and the product's literal feature is "no cutting needed." The transition style IS the demo.

**11. Diegetic transitions — the product's own iconography as edit bridges** — Linear ~86s (real loading spinner), ~92s (checkmark), ~182s (clean black), 6–15 frames each.
A stitched demo reads as one continuous live session because every join looks like "the app is doing something," not "the editor cut." Launders unlimited screens into one take; invisible even to a scene-cut detector.

**12. The machine-gun crescendo before the resolve** — Superhuman 62.8–64.5s (8 cuts in 1.7s of world-travel imagery = "everything you'd do with your time back"), Apple opening montage. Use at most once, immediately before the logo resolve.

## TYPOGRAPHY

**13. Type cards as chapter markers inside long takes** — Atlas ("Assists," "Takes action for you" — 1–3 words, mid-take); Raycast ("NEW | HOTKEY RECORDER" mono two-column swaps); Dia ("If it's in your tabs" → "Dia already knows" as paired setup/payoff cards).
Short declarative fragments, one per card, black or white pure-contrast, 1.5–3s. They chapter the film so a cutless stretch never reads as a wall of UI.

**14. Typed builds, not fades** — Atlas (every headline builds left-to-right as if being typed); Raycast (placeholder text letter-by-letter with a blinking caret); Linear/Raycast product text always typed at human cadence. In an AI/tool film, type that *types itself* is diegetic; type that fades is advertising.

**15. Split the sentence across the cut** — Superhuman ("Wind back time for what matters" → cut → "what matters"); phrase-by-phrase builds over one held aerial (0–8.4s). The edit completes the grammar; the viewer's brain supplies the join.

**16. Zero overlaid marketing copy on product footage** — Linear (no captions anywhere; the UI's own type speaks), Apple (text never overlaps a live shot — it always gets its own black card). Callouts, arrows and lower-third captions are the #1 tell of an amateur demo.

**17. All type-motion budget goes to the product, none to the brand** — Raycast: brand cards are hard static swaps; the animated text lives inside the UI (streaming tool-call rows, autocomplete). Restraint outside, life inside.

## SOUND

**18. Silence bookends** — Vercel: 4 full seconds of silence + stillness before anything; Raycast: music drops away exactly on "COMING 2026," last ~2s silent; Dia: silence in final 2s; Superhuman/Apple: fade to quiet on logo. Open in silence to earn the music; kill the music to earn the logo.

**19. The drop-out before the end card** — Raycast (loud → text flicker → total silence → white logo on black). The end card in silence reads as confidence; an end card under continuing music reads as a YouTube outro.

**20. One loudness arc, not a bed** — Atlas -29dB → 0dBFS → quiet, a single measured build-and-resolve mapped to capability density. Raycast runs the hottest mix of the corpus (-10dB RMS) because a 39s teaser is one uninterrupted crescendo. A constant-level music bed (the slideshow default) is the audio equivalent of a static screenshot.

**21. Sound-first moments** — Screen Studio's machine-gun cluster loudens as cuts shrink (panic is audio-visual); Apple settles cut-rate and loudness together at the voice handoff. Whooshes belong to transitions the viewer can see; nothing in this corpus whooshes decoratively.

## STRUCTURE

**22. Wordless cold open on a moment, not a logo** — Dia (hands chopping garlic), Linear (founder mid-sentence, brand sting arrives 1.6s LATE), Screen Studio (desk clutter materializing), Superhuman (aerial + question type). Nobody opens on a wordmark; half the corpus delays the brand 1.5–8s.

**23. Materialize-from-black** — Raycast 0–1.4s: near-black glass, two light streaks, then the UI *breathes into existence* with a blinking caret. The strongest possible open for a dark product film: the interface is born out of the dark, already alive.

**24. Register shift as the reveal** — Dia: the old way is filmed practically (bezels, reflections, clutter, warm grain); the product is bezel-less floating UI in a different color temperature. The comparison is made by cinematography, not copy.

**25. Mirror-symmetric bookends** — Atlas (push-in on icon ↔ pull-out to icon; same asset, reversed), Linear (closing UI shot revisits the opening screen; wordmark sting both ends), Vercel (flat type card → world → same flat type card). The film closes by undoing its opening move — reads as designed, not assembled.

**26. Withhold the future, demo the present** — Raycast: every NEW feature is a text card, never demonstrated; all demonstrated UI is existing functionality. A teaser borrows credibility from what's real to sell what's coming. Corollary: show real data, real typing cadence, real favicons (Dia's autosuggest, Linear's progressing roadmap %).

**27. Time visibly passes inside the demo** — Linear: a screen revisited later shows progressed data (roadmap % moved). One cheap continuity detail = "this is a living system, not a mockup."

**28. Dark-film color law** — Raycast + Apple + Vercel: near-black world in ONE material family (obsidian glass / graphite set / indigo voxel night), a single key-light logic, hairline strokes and speculars for edges, and exactly ONE saturated accent at a time (Raycast's cycling focus ring, Apple's cyan-violet chart line, Vercel's cyan windows). End card = hard palette reset to flat black/white. Every additional simultaneous hue is a step down-market.

---

# TOP 10 — prioritized to transform a static screenshot-slideshow into a cinematic teaser

1. **Kill the slideshow with the frozen container** (Atlas #1): one locked frame geometry, content dissolving inside it — instant "one unbroken session" out of existing captures. Highest impact per hour of work.
2. **Cut on peaks; carry the climax uncut** (#8): re-time every remaining cut to land within ~1 frame of a musical hit, and delete the cuts in the loudest 8–10s in favor of content acceleration.
3. **Materialize-from-black open + silent end card** (#23, #18, #19): black + one light streak → UI breathes in with a caret; music dies on the tagline; logo holds in silence.
4. **Type everything, fade nothing** (#14): headlines build as typed text; UI text streams at human cadence with a visible caret. Diegetic motion, free of charge in Remotion.
5. **Macro-to-monument reveal** (#2): open scale-ambiguous on one element, pull back to reveal the whole system on the first swell.
6. **Chapter the take with 2-word type cards** (#13): pure-contrast declarative fragments every 6–10s instead of section screenshots.
7. **Diegetic transitions** (#11): bridge any unavoidable jump with 6–15 frames of the product's own pulse/spinner/flash asset, never a crossfade.
8. **One accent color in a one-material dark world** (#28): strip the palette to near-black + hairlines + a single traveling accent; reset to flat black/white for the end card.
9. **Live interaction, never stills** (#26, #27): every UI moment must contain one visible state change — typing, a row streaming in, a value updating — and real-looking data.
10. **A single 2–3s "before" cluster** (#10): if the film argues against an old way, compress it into one dense multi-cut burst so the cutless product section reads as relief. Optional; omit if the 30s has no problem beat.

---

# HISTORICAL PROPOSAL, NOT THE ACCEPTED TEMPLATE — 30s experimental graph teaser (REJECTED direction)

**Important:** the resulting graph-as-world teaser was rejected. Preserve this as an experiment, not a recommendation or the source of the later accepted film. The accepted direction used readable phone scenes and a stable glass desktop.

**Original hypothesis about the concept** (one continuous camera flight through a 3D memory graph, live UI moments embedded in the space, cut to the beat):

- **The continuous flight is validated** — it is exactly what the best films in the corpus do (Atlas 49s, Vercel 19.6s, Linear 179s). Keep it. It is the right spine.
- **"Cut to the beat" is half wrong.** The measured evidence says: cuts land on beats *when they exist*, but the loudest passages of the best films are UNCUT — the climax is carried by accelerating content turnover and music, not editing (Atlas peak inside the take; Vercel's loud hero hold). Re-frame the rule: *content changes on the beat; the camera never cuts at the climax.*
- **Biggest risk of the concept as stated:** a pure graph fly-through with UI "embedded in the space" reads as a weightless screensaver — the corpus never shows UI as decoration in a 3D world without also LOCKING it. Superhuman angles it but keeps it razor-sharp and static; Atlas freezes the container completely. Fix: the flight must periodically *dock*.
- **What the concept is missing:** a silence-and-black open, a scale-ambiguity reveal, typed chapter markers, live interaction inside every UI moment, diegetic transitions, the end-card silence, and one-accent color discipline.

**The refined shape — "Dock and release":**

- **0.0–2.0s — Born from black.** Silence, near-black obsidian, one hairline light streak. A single memory node materializes with a soft pulse — scale-ambiguous, could be a star (Raycast open + Vercel silence). No logo, no music yet.
- **2.0–7.0s — The monument reveal.** First musical swell; camera pulls back in one move and the node resolves as one point in a vast constellation — the executive's memory graph, thousands of nodes, hairline edges, depth fog, parallax dust drifting past the lens (Vercel #2). One typed micro-label near the node (real-looking data: a person's name, a decision) — typed, with caret (#14).
- **7.0–22.0s — The flight, with three docks.** One unbroken spline through the graph. Three times, the camera approaches a UI plane and DOCKS: the plane locks to full-frame, chrome-cropped (Linear #5), holds 2.5–3.5s while ONE live interaction plays — (a) the morning brief typing itself; (b) chat executing a real task with a consent chip appearing and being granted; (c) a day's calendar reshuffling as the engine reasons. Then release: the UI un-crops and falls away behind as the flight continues. Between docks, 2-word mono chapter cards float in the space ("IT REMEMBERS." / "IT REASONS." / "IT ACTS — WITH CONSENT."). Every graph-to-UI join is bridged by the product's own node-pulse as the diegetic transition (#11). Content turnover accelerates dock-to-dock as the music builds (#9).
- **22.0–26.5s — Climax, uncut.** Peak loudness. NO cuts, no new UI: the camera keeps flying as a cascade propagates through the graph — edges lighting up in sequence, months of accumulated intelligence connecting in front of you (the compounding-moat shot). Fastest visual density of the film, one accent color doing all the work (#28, #8).
- **26.5–30.0s — The silence.** Music drops dead (#19). The graph recedes/condenses in the same continuous move into the the product orb alone in darkness. Hard reset to flat type: "PRODUCT" white on black, one typed sub-line ("The executive OS that knows you."). Final 1.2s fully silent, logo holding (#18, #25 — the close mirrors the open: born from black, returned to black).

**Hard rules for the build:** one camera move for 30 seconds, zero hard cuts (docks and releases are moves, not edits); every visible text element either types itself or streams; real-looking executive data throughout, no lorem; one accent hue total; audio mixed as a single arc from silence to ~-10dB back to silence; end card never shares a frame with the graph.

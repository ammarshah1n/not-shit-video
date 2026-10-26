# Sound: one arc, room for words

## Voice

The recovered voice direction used ElevenLabs Lily (`pFZP5JQG7iQjIQuC4Bku`), model `eleven_turbo_v2_5`, stability 0.5 and similarity 0.75. This is a reproducibility reference, not a claim that it is the current best model or available on every plan. Set `--voice` / `--model` for your authorised choice; verify availability and current provider terms first.

`tools/tts.py` reads `ELEVENLABS_API_KEY` from the environment only. It does not access a keychain, reuse a creator account, purchase credits, clone a voice or run on installation. Calls require `--allow-paid`.

Input:

```json
[{"file":"opening.mp3","line":"A clear place to begin."}]
```

Generate only changed lines. Measure each output with ffprobe and reserve lead-in plus enough scene time. Listen in context AND in isolation. Lowercasing, phonetic spelling, or rewriting the following word can fix mispronunciation. ASR on an isolated word plus the full line is useful corroboration, not a substitute for hearing it. Keep the literal on-screen product spelling separate from a TTS respelling.

Aim for purposeful voice, not a wall of explanation. The accepted long cut used roughly 35 seconds of narration in a 119-second film. Music-only title, ambient phone beats, and a silent final hold gave it room.

## Original UI sound

`.venv/bin/python tools/make-sfx.py out/sfx` produces deterministic send, receive, tick, whoosh and record WAVs. Seeded noise, oscillator sweeps, envelopes, stereo PCM. No sampled platform sounds. Align a sound to the visible event; no decorative whoosh on every transition. Normalise sources, then mix below speech instead of playing every sound at its source peak.

## Music

One composition that builds with information density and stops before the close. A constant-level stock bed feels like a slideshow. Duck to roughly 55% of the chosen music level under narration as a starting point; verify the actual mix. Keep the close genuinely silent after the final line.

Generated music is OPTIONAL. The prior film's paid music was private-use pending a licence review, so none is bundled. Check current commercial, distribution, attribution and account-plan terms before any public use. No provider price list from an old research note is authoritative.

### Extend bars, do not stretch performance

`tools/extend-music.py` searches spectral similarity and waveform alignment, then inserts short equal-power crossfades at backwards jumps. It repeats bars while preserving the original arc. It requires NumPy/FFmpeg and an existing authorised input. Example joint windows are `[tmin, tmax, Lmin, Lmax]` in ORIGINAL seconds. Use ordered windows, leave margins, inspect the printed `at` / `back` choices, then align film holds to those exact extension lengths. Listen at every join. This is a bounded editing aid, not a beat detector that knows your song.

## Finish

`python3 tools/finish.py mix.mp4 finished.mp4` measures integrated loudness, applies one gain toward −16 LUFS and limits peaks around −2 dBFS without auto makeup. It measures the output again and warns if more than 1 LU from target. It does NOT certify true-peak compliance: AAC intersample peaks can differ. Confirm with `ebur128=peak=true` and the delivery platform's requirements. One constant gain preserves the soft-open/loud-climax arc; aggressive dynamic loudness normalisation can flatten it.

`--height 1080` also creates an aspect-preserving viewing copy. Silent files are rejected rather than amplified wildly. Never overwrite the master. Inspect channel count, duration, clipping, sync, word truncation, fades and the silent close.

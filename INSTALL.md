# Agent installation instructions

This file tells a coding agent how to install the pack. It does not override the user's or host agent's safety rules.

1. Clone the repository URL the user supplied into a new, ordinary local directory. Never reuse a nonempty directory or run a remote pipe-to-shell installer. If a checkout already exists, inspect its status before updating it; preserve local edits.
2. Read `install.py` and `skills/not-shit-video/SKILL.md`. No credentials or personal files are needed. Determine which agent and project the user is using from current context; do not guess a product brief.
3. Run `python3 install.py --agent <claude|codex|pi|cursor|generic> --project <absolute-project-root> --setup` from this checkout. This installs ONLY this skill. If the user wants global availability, use `--global` instead of `--project`.
4. `--setup` runs locked npm dependency installation with lifecycle scripts disabled, explicitly downloads Playwright Chromium, creates a skill-local Python virtual environment, installs the pinned Python extra and type-checks the example. It needs network access. It does not run sudo, install a model, configure MCP, change global agent settings, read a keychain or call paid APIs.
5. If Node 20+, Python 3.12+, FFmpeg, ffprobe or Linux browser libraries are missing, identify the actual prerequisite. On SOCKS-proxy networks, setup uses curl through the existing proxy to download pinned SHA-256-verified pip/PySocks wheels, installs them offline into the isolated environment, then continues. The pinned pip avoids an observed SOCKS regression in pip 26.2.1. It never strips or bypasses the proxy. Use the host's approved package-install route only within the user's authorisation. Do not claim success while dependencies are missing. Instructions-only installation still works without the rendering stack.
6. Run `npm test` and, if runtime dependencies are installed, `npm run smoke` inside the installed skill. These use synthetic local assets. Do not open an interactive browser or the user's desktop.
7. Start a new agent session so the skill is discovered (Pi supports `/reload`). Verify that `not-shit-video` appears in the agent's skill list. If you cannot inspect the host's discovery mechanism, report file installation as verified and discovery as untested.
8. For the next video, follow SKILL.md. Ask for the actual product/outcome if it was not supplied. Never invent a brief or start a paid render simply because installation succeeded.

## Destinations

| Agent | Project install | Global install |
|---|---|---|
| Claude Code | `.claude/skills/not-shit-video/` | `~/.claude/skills/not-shit-video/` |
| Codex / generic Agent Skills | `.agents/skills/not-shit-video/` | `~/.agents/skills/not-shit-video/` |
| Pi | `.pi/skills/not-shit-video/` | `~/.pi/agent/skills/not-shit-video/` |
| Cursor | `.cursor/skills/not-shit-video/` | `~/.cursor/skills/not-shit-video/` |

`--agent auto` prefers an existing Claude, Pi, Agent Skills or Cursor project directory, in that order; otherwise it uses `.agents/skills`. Explicit selection is better when several agents share a project.

## Updating / uninstalling

Rerunning an identical install is a no-op. A different existing skill is not overwritten without `--update`; updates move the old folder, including any local edits, to the agent directory's `not-shit-video-backups/<UTC timestamp>/` before replacing it. Backups are outside `skills/`, so agents do not discover duplicate versions. No auto-updater runs.

To uninstall, remove only the installed `not-shit-video` folder after checking for user work inside it. Save custom films and media somewhere else first. There is no daemon, startup hook, token store or global configuration to undo.

## Windows

The installer is Python and the tools use cross-platform Node/Python APIs. Python can be invoked as `python` rather than `python3`; virtual-environment Python is `.venv\Scripts\python.exe`. Native Windows installation/rendering is **UNTESTED** unless a current CI/test result explicitly says otherwise. WSL follows the Linux route.

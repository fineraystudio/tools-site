<!-- library-rules-pointer -->
# Read the rules in Farid's library first

Before you change anything or spend any money in this repo, read these files (paths are relative to this
file; `GitHub/library/rules` is the one source of truth, so edit rules there, not here):

1. `../../library/rules/shared/ALL-PROJECTS.md`
2. `../../library/rules/shared/MEDIA-RULES.md`
3. `../../library/rules/projects/autobots-lab-tools-site/AGENTS.md`
4. Every rule card in `../../library/rules/*.md` that fits the task (for example `exact-pictures.md` before making pictures that must be correct).

If the library is not there (a cloud clone of this repo alone), say so and ask Farid for the rules before changing code or making paid pictures, voice or video.

<!-- /library-rules-pointer -->

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PDF audit follow-up — neon-circuit

Source: GitHub Portfolio Technical Audit, 2026-10-03, pages 19–20.
Repeated dependency and quality-gate entries are consolidated below.

| Finding | Resolution and evidence |
| --- | --- |
| P1 Windows official build failure | Invoke local Vite with Node; official build and preview are exercised by the OS matrix. |
| P2/P3 quality gates (duplicate) | Fixed irregular JSX whitespace, const errors, this alias and shared catch; hook dependencies are explicit. |
| P2 advisory dependencies (duplicate) | Compatible lock repairs/security updates; complete + production audit show zero findings. |
| P2 missing browser race coverage | Desktop/mobile production tests enter an actual WebGL race, accelerate via keyboard, pause, and verify save export/import failure and backup-only recovery. |
| P2 local save reliability | Validated import/export, older-save migration, corrupt/absent-primary recovery, independent backup/primary writes, quota/security notice, reset, newer-version preservation and roundtrip coverage. |
| Observed large renderer bundle / memory concern | Split showroom preview from race engine so opening garage does not load race simulation; dispose shared preview GPU resources once on unmount, with disposal regression coverage. Three.js remains a substantial deferred dependency; no budget was raised. |

The existing race/economy tests are now part of `npm test` (the old default script
only ran scaffold tests). Existing idempotent payout, unlock, AI race and physics
checks remain active. Save recovery now handles valid JSON with an invalid shape,
and a backup-only career correctly offers Continue. A failed write no longer marks
a nonexistent file as saved. Preview geometry/material/environment cleanup is tested.

Local result: 197 script scaffold + 32 app-data/auth tests; 19 domain tests; 4 E2E
cases; typecheck, lint and official production build pass. Chromium uses software
WebGL in automation; that verifies renderer functionality, not physical GPU performance.
The browser test waits for the rendered HUD and actual starting countdown before measuring
acceleration; software-rendered frames can advance game time slower than wall time.

## Validation and reproduction

Node 22 / npm 10. `npm ci --ignore-scripts`, `npm audit --audit-level=high`,
`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`,
`npx playwright install chromium`, `npm run test:e2e`.
The repository's official Vite wrapper is used for the production build and browser preview.
`test:scaffold` reports platform helper tests separately from `test:domain` game tests.
GitHub Actions runs the same gates and Chromium E2E on Ubuntu and Windows. Browser
traces/screenshots are uploaded on failures. Browser tests use fresh storage for each case.

The dependency lock was repaired because a fresh `npm ci` failed on the newer main
branch. `npm audit fix` updated compatible transitive versions (brace-expansion and
js-yaml); the complete and production-only audits now report zero vulnerabilities.
The old PDF snapshot is not the current dependency graph. This is a dated scan,
not a guarantee against future advisories. fast-uri resolves to 3.1.8 in the current graph.

The wrapper executes the resolved local Vite JS CLI through `process.execPath`,
preserving arguments, environment precedence, signals and failure exit status.
`app-env.json` keeps this public game auth-off on a clean clone; optional `.grok`
settings override it and process environment overrides both. Existing platform
branding, helpers and deployment configuration are preserved. Rebuildable deployment
output is ignored instead of committing machine-specific generated bundles.

Platform regression tests now use an isolated blank OG workspace when testing
fallback metadata; they no longer inherit the real game's title/card. Windows
directory-link tests use junctions without needing administrator symlink privileges.
No test cases, lint rules, vulnerability gate or bundle threshold were disabled.

## Limits that remain explicit

Browser saves are local, user-controlled and not an anti-cheat or server durability
boundary. Manual JSON export/import provides a portable backup, not automatic cloud
sync. An authenticated shared service requires a separate product and deployment
choice; this change adds no unauthenticated shared database. Newer save versions
are preserved instead of silently overwritten. Exports are local JSON files, imports
are size-limited, validated and confirmed before replacement.

Desktop Chromium and emulated mobile viewport checks do not prove real iOS/Android
touch/audio behavior, long-session memory stability, production provider behavior,
or low-end device frame rates. No deployment or merge was performed. The provider's
external Grok extension can be blocked by its cross-origin response; it is retained
and is recorded as an external integration warning. Application uncaught errors are
asserted by the browser suite. Physical audio listening and long play sessions remain
external verification tasks.

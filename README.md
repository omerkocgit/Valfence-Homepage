# VALFENCE landing page

A bilingual (English/German) landing page with interactive, fictional renewable-energy examples. React + TypeScript + Vite + Tailwind CSS.

## Run locally
Requires Node.js 22+ and pnpm 11.19.0 (or npm).
```sh
pnpm install
pnpm dev
```
Open http://127.0.0.1:3000. No Gemini key, backend, database or environment variables are needed.

## Verify and build
```sh
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```
Deploy the generated `dist/` folder to a static host. The development server binds to loopback only.

## Demo behavior
- The 48 MW workspace, its scenario tables, model preview and memo share one session state.
- Selecting a price source changes the assumption. Every change requires fresh demo approval.
- P90 applies an 11.2% generation reduction. Both scenarios use the same simplified cash-flow model.
- IRR comes from the cash-flow series; DSCR is the minimum over debt repayment years. Negative flows remain visible.
- The 120 MW visual simulator and static source-flow/scanner are explicitly separate examples.
- All source excerpts and comparison bands are illustrative, not a live market-data feed.
- Model/memo actions open previews, not downloads. Enquiries use the visitor's email application.
- Demo edits reset on reload; language, theme and consent are stored locally when storage is available.

## Analytics
Clarity is withheld until analytics consent and disabled on localhost. ConsentV2 denies advertising storage. Settings support reopening, withdrawal and blocked local storage.
Reference: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2

## Accessibility and maintenance
Dialogs trap focus, support Escape and restore focus. Motion respects reduced-motion preferences. Review small/mobile widths in both languages when changing copy.
The original ZIP remains unchanged in the parent directory. Use `pnpm-lock.yaml` for reproducible installs. The obsolete imported Bun lock has been removed from the working copy.
Owner/contact details in the existing interim legal copy must be completed by the site owner before public launch.

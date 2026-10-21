# KodRoot

Official website for KodRoot, a software development company founded in Kosovo.

The current visual treatment is interim. Page copy, routes, and the questionnaire are in place so a later visual redesign can change layout and styling without rebuilding the architecture.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Zod 4 (questionnaire validation only)

Package manager: **npm** (`package-lock.json`).

## Routes

| Path                    | Purpose                                                                         |
| ----------------------- | ------------------------------------------------------------------------------- |
| `/`                     | Homepage: introduction, offering, AI capabilities, approach, closing invitation |
| `/discuss-your-project` | Guided project questionnaire                                                    |
| `/#services`            | Homepage offering                                                               |
| `/#intelligence`        | Homepage AI capabilities                                                        |
| `/#approach`            | Homepage approach                                                               |

There is no Work, About, or per-service page. There is no backend, database, or API route.

## Project structure

- `app/` — App Router layouts, pages, metadata, sitemap, robots, Open Graph image, branded 404
- `components/app-link.tsx` — in-site links, including hash scroll on the homepage
- `components/sections/` — homepage sections (server components)
- `components/inquiry/` — questionnaire UI and field helpers (client only where state is required)
- `components/ui/` — small shared primitives (`Section`, `TextLink`, `Kicker`, `Vinculum`)
- `lib/content.ts` — marketing copy
- `lib/site.ts` — identity and default metadata (`kodroot.com`, `hello@kodroot.com`)
- `lib/navigation.ts` — primary nav and the “Discuss your project” CTA
- `lib/inquiry/` — questionnaire steps, validation, brief, mailto
- `public/brand/` and `app/fonts/` — official brand files and Source Sans 3 (SIL OFL)
- `docs/brand/` — brand documentation copies

Keep brand originals even when a file is not imported. Some assets are for metadata, print, or a later design pass.

## Discuss your project

The questionnaire is frontend-only. Answers stay in the browser. After review, the visitor can open a prepared `mailto:hello@kodroot.com` message or copy the brief. The page does not send the brief to KodRoot, produce a quote, or promise a delivery date.

`mailto` length can fail in some email clients. Copy brief is the fallback.

No environment variables are required. Pricing ranges stay disabled until an approved pricing model exists (`PRICING_ENABLED` in `lib/inquiry/defaults.ts`).

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run format
npm run format:check
npm run build
npm start
```

`npm install` also runs `prepare`, which sets up Husky. The pre-commit hook runs lint-staged (ESLint and Prettier on staged files only). To skip hooks for a single command, set `HUSKY=0`.

## Later redesign

Pages are stacked and plain so a later visual pass can change composition without first undoing a layout system.

- Keep routes and the frontend-only questionnaire contract.
- Change composition in `components/sections/` and `components/inquiry/`.
- Change tokens in `app/globals.css` / `lib/brand.ts` only with an approved palette.
- Do not invent clients, metrics, quotes, prices, or case studies.

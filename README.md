# KodRoot

Official website for KodRoot, a software development company founded in Kosovo.

Brand assets live in `public/brand/` and `app/fonts/`. Site identity is centralized in `lib/site.ts`. Color tokens live in `app/globals.css` and match `lib/brand.ts`.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

Package manager: **npm** (`package-lock.json`).

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

`npm install` also runs `prepare`, which sets up Husky git hooks. The pre-commit hook runs lint-staged (ESLint and Prettier on staged files only). To skip hooks for a single command, set `HUSKY=0`.

## Discuss your project

The project questionnaire lives on `/discuss-your-project`. It is frontend-only: answers stay in the browser, then the visitor reviews a brief and can email it to `hello@kodroot.com`. The form does not send submissions to KodRoot, produce a quote, or promise a delivery date.

No environment variables are required. Pricing ranges stay disabled until an approved pricing model exists (`PRICING_ENABLED` in `lib/inquiry/defaults.ts`).

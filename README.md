# KodRoot

Official website for KodRoot, a software development company founded in Kosovo.

This repository currently contains the Next.js application after starter-template cleanup, with linting, formatting, and git hooks in place. Brand assets live in `public/brand/` and `app/fonts/`. Design tokens, full page sections, and the project inquiry form will follow in later stages.

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

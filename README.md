# KodRoot

Official website for KodRoot, a software development company founded in Kosovo.

The site is an industrial editorial presentation of the existing brand, with a project inquiry that sends through Resend once the environment variables below are set.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Zod 4 (questionnaire validation, on the client and the server)
- Resend (project inquiry email, server only)

Package manager: **npm** (`package-lock.json`).

## Routes

| Path                    | Purpose                                                                         |
| ----------------------- | ------------------------------------------------------------------------------- |
| `/`                     | Homepage: introduction, offering, AI capabilities, approach, closing invitation |
| `/discuss-your-project` | Multi-step project inquiry                                                      |
| `/privacy`              | Privacy policy                                                                  |
| `/terms`                | Terms and conditions                                                            |
| `/api/inquiry`          | `POST` only. Validates and emails the inquiry                                   |
| `/#services`            | Homepage offering                                                               |
| `/#intelligence`        | Homepage AI capabilities                                                        |
| `/#approach`            | Homepage approach                                                               |

There is no Work, About, or per-service page. There is no database. The only server route is the inquiry handler.

## Project structure

- `app/` — App Router layouts, pages, metadata, sitemap, robots, Open Graph image, branded 404
- `components/app-link.tsx` — in-site links, including hash scroll on the homepage
- `components/sections/` — homepage sections (server components)
- `components/inquiry/` — questionnaire UI and field helpers (client only where state is required)
- `components/ui/` — small shared primitives (`Section`, `TextLink`, `Kicker`, `Vinculum`)
- `lib/content.ts` — marketing copy
- `lib/site.ts` — identity and default metadata (`kodroot.com`, `hello@kodroot.com`)
- `lib/navigation.ts` — primary nav and the “Discuss your project” CTA
- `lib/inquiry/` — questionnaire steps, validation, brief, rate limit, Resend delivery
- `app/api/inquiry/route.ts` — inquiry submission
- `public/brand/` and `app/fonts/` — official brand files and Source Sans 3 (SIL OFL)
- `docs/brand/` — brand documentation copies

Keep brand originals even when a file is not imported. Some assets are for metadata, print, or a later design pass.

## Discuss your project

`/discuss-your-project` is a multi-step inquiry. Answers stay in the browser until the visitor sends them. Back and Continue keep those answers. The review step is not a quote, and a date on the form is not a delivery promise.

Send posts JSON to `POST /api/inquiry`. The handler checks the origin, a honeypot field, a minimum fill time, and an in-memory rate limit (6 requests per 15 minutes per address, per server process). It validates the body with Zod again, then sends plain text through [Resend](https://resend.com/docs/send-with-nextjs). The page shows success only when the handler returns `{ "status": "received" }`. A missing key, a rejected send, a network failure, or a validation error stays a failure. Nothing is stored in a database.

The rate limit is per process. On a host with more than one instance it is best-effort, not a shared lock.

Budget brackets are the visitor’s own range in euro. They are not KodRoot prices. Published prices stay off (`PRICING_ENABLED` in `lib/inquiry/defaults.ts`).

### Email setup

Email is not sent until these exist:

1. A Resend account, an API key, and a verified domain at [resend.com/domains](https://resend.com/domains). `onboarding@resend.dev` is rejected. The `from` address has to be on a domain Resend has verified, or the handler reports that delivery is not configured.
2. Environment variables, from `.env.example` into `.env.local` (and the host’s environment in production):

| Variable             | Purpose                                                                               |
| -------------------- | ------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | Server-only Resend key. Never prefix it with `NEXT_PUBLIC_`.                          |
| `INQUIRY_FROM_EMAIL` | Sender on the verified Resend domain, for example `KodRoot <hello@mail.kodroot.com>`. |
| `INQUIRY_TO_EMAIL`   | Inbox that receives inquiries, for example `hello@kodroot.com`.                       |

Until those are set, the form stays usable and a submission returns “This form cannot send email yet.” It does not pretend the inquiry was received. The footer address remains a direct way to write.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run format
npm run format:check
npm run test
npm run test:e2e
npm run test:e2e:production
npm run audit:lighthouse
npm run build
npm start
```

`test:e2e` starts its own server on port 4173 with `INQUIRY_MOCK_DELIVERY=sent`, so Playwright does not send real email. `test:e2e:production` builds first, then runs the same tests against `next start`. Live Resend checks stay off unless `E2E_LIVE_INQUIRY=1` is set with an authorized recipient.

`npm install` also runs `prepare`, which sets up Husky. The pre-commit hook runs lint-staged (ESLint and Prettier on staged files only). To skip hooks for a single command, set `HUSKY=0`.

## Visual system

The current direction is industrial brutalist editorial: night and paper fields, burgundy used as a mark rather than small text on dark grounds, and Source Sans 3 for every line of type. Section composition lives in `components/sections/` and `components/inquiry/`. Tokens and motion live in `app/globals.css`.

Motion is CSS and the View Transitions API: a short hero sequence, a stroke reveal on the official root symbol, scroll-drawn rules, service-row shift on hover, and a brief page move between `/` and `/discuss-your-project`. `prefers-reduced-motion: reduce` removes those animations. There is no scroll hijacking and no extra animation library.

Do not invent clients, metrics, quotes, prices, or case studies. Change palette tokens only with an approved brand change.

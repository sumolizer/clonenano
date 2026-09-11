# Naano clone — audit baseline

An internal baseline clone of the [naano.com](https://naano.com) marketing site, built for
audit purposes. Not affiliated with or endorsed by naano.

## Scope

Cloned:

- Landing page (`/`), `For creators` (`/creators`), `For agencies` (`/agencies`)
- Shared navbar (with the "Resources" dropdown) and footer
- Sign up (`/register`) and sign in (`/login`) flows

Deliberately **not** cloned / out of scope for this baseline:

- Any OAuth integration (the live site offers "Continue with LinkedIn" / "Continue with
  Google" — those are omitted here per the brief). Auth is email + password only,
  backed by JWTs (see below).
- Blog, Free Tools, and case study detail pages (linked from the Resources dropdown,
  but not yet built out).
- Any actual product/dashboard surface beyond the marketing site and auth pages.

Marketing copy on these pages is paraphrased, not copied verbatim from the live site,
and testimonial/creator names are placeholder personas — swap in real copy before this
goes anywhere public.

## Auth

- `POST /api/auth/register` — creates a user (`name`, `email`, `password`, `role`:
  `"brand" | "creator"`), hashes the password with bcrypt, and sets an httpOnly JWT
  cookie.
- `POST /api/auth/login` — verifies credentials, sets the same cookie.
- `GET /api/auth/me` — returns the current user from the JWT cookie, or `{ user: null }`.
- `POST /api/auth/logout` — clears the cookie.

Users are stored in `data/users.json`, a plain JSON file created on first write
(gitignored — never commit real user data). This is a baseline/demo store: it is not
safe under concurrent writes and has no migrations. Swap in a real database before this
goes past a local audit.

Set `JWT_SECRET` in `.env.local` (see `.env.example`) — a local dev secret was already
generated for you and is gitignored.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

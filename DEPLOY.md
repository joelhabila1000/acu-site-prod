# Deploying the ACU CMS

The app is split into three pieces so each runs where it works best:

| Piece | Host | Notes |
| --- | --- | --- |
| Public site (static `dist/`) | **Hostinger** | Uploaded to `public_html` |
| API (`server/`, Express + Prisma) | **Vercel** | Serverless function via `api/[...route].js` |
| Database (Postgres) | **Neon** | Free tier; pooled URL for the API |
| Image uploads | **Vercel Blob** | Set `BLOB_READ_WRITE_TOKEN` on Vercel |

> Everything on one host instead? Put the site on the same Vercel project and skip
> step 3's `VITE_API_BASE` (leave it blank).

---

## 1. Create the database (Neon)

1. Create a project at https://neon.tech.
2. Copy **two** connection strings from the dashboard:
   - **Pooled** connection (host contains `-pooler`) → `DATABASE_URL`
   - **Direct** connection → `DIRECT_URL`
3. Append `?sslmode=require` if it is not already present.

Create the tables and seed the initial content. From the repo root:

```bash
cd server
# point at Neon (create server/.env with the two URLs first)
npx prisma db push
npm run seed
```

`prisma db push` creates the schema; `npm run seed` loads the site's current content
(settings, faculties, principal officers, news & events) and the admin user.

> Prefer versioned migrations? Run `npx prisma migrate dev --name init` locally first,
> commit the generated `server/prisma/migrations/` folder, then use
> `npx prisma migrate deploy` against Neon in future.

## 2. Deploy the API (Vercel)

1. Import this repository at https://vercel.com/new. The Vite frontend builds too, but
   the canonical site lives on Hostinger.
2. Add these **Environment Variables** (Production):

   | Name | Value |
   | --- | --- |
   | `DATABASE_URL` | Neon **pooled** URL |
   | `DIRECT_URL` | Neon **direct** URL |
   | `AUTH_SECRET` | a long random string (see below) |
   | `CORS_ORIGINS` | your site origin(s), comma-separated |
   | `BLOB_READ_WRITE_TOKEN` | from Vercel → Storage → Blob |

   Generate a secret:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

   `CORS_ORIGINS` example:
   ```
   https://acu.edu.ng,https://www.acu.edu.ng
   ```

3. Deploy, then confirm the API responds:
   ```
   https://<your-project>.vercel.app/api/settings
   ```

## 3. Build the site for Hostinger

The site needs to know where the API lives **at build time**.

1. Create `.env.production` in the repo root:

   ```
   VITE_API_BASE=https://<your-project>.vercel.app
   ```

   (No trailing slash. Leave blank if the API is on the same origin as the site.)

2. Build:

   ```bash
   npm install
   npm run build
   ```

   Output is in `dist/`, and already includes `.htaccess` for SPA routing.

## 4. Upload to Hostinger

1. In hPanel → **File Manager** (or FTP), open `public_html`.
2. Delete the default placeholder files.
3. Upload **the contents of `dist/`** (not the `dist` folder itself) into `public_html`.
   Make sure `.htaccess` is included (enable "show hidden files").

The `.htaccess` makes deep links like `/news`, `/academics` and `/admin` work on
refresh instead of 404ing.

## 5. First login

- Visit `https://your-domain.com/admin`
- Sign in with `admin@acu.edu.ng` / `adminchangeme`
- **Immediately** go to **Users & Roles** and change the password.

---

## Local development

```bash
# Terminal 1 — API (needs a local Postgres)
cd server
cp .env.example .env      # fill in DATABASE_URL / DIRECT_URL / AUTH_SECRET
npx prisma db push
npm run seed
npm run dev               # http://localhost:4000

# Terminal 2 — site (Vite proxies /api to :4000)
npm install
npm run dev               # http://localhost:5173
```

Leave `VITE_API_BASE` blank locally; the Vite dev proxy handles `/api`.

## Troubleshooting

- **Site loads but content doesn't update** — check the browser console for CORS errors;
  the site's origin must be listed in `CORS_ORIGINS`.
- **`/api/...` returns HTML** — the rewrite is sending it to `index.html`; verify the
  request is hitting the Vercel API domain, not the Hostinger domain.
- **Prisma "too many connections"** — use the Neon **pooled** URL for `DATABASE_URL`.
- **Deep links 404 on Hostinger** — `.htaccess` was not uploaded (hidden files).

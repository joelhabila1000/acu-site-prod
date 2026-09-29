# Going live on Hostinger

The whole stack runs on one Hostinger plan: the static site, the Express API and
the MySQL database. Nothing here depends on Vercel or Neon any more.

> **Plan requirement:** Hostinger only supports Node.js apps on **Business** or
> **Cloud** plans. On Premium you'd have to keep the API elsewhere.

| Piece | Host | Where |
| --- | --- | --- |
| Public site (static `dist/`) | main domain | `public_html` |
| API (Express + Prisma) | `api.your-domain.com` | Node.js web app |
| Database | Hostinger MySQL | same plan |
| Uploads | persistent folder on the host | outside the build directory |

Hostinger requires a Node.js app to be its own *website*, so the API gets a
subdomain and the main domain stays a plain static site.

---

## 1. Create the database

1. hPanel → **Databases → MySQL Databases**. Create `acu_cms` and a user.
2. Note the database name, username, password and host (usually `localhost`).

## 2. Move the data across

The local database is already MySQL, so this is a straight dump and import.

```bash
# export from the local XAMPP MariaDB
C:\xampp\mysql\bin\mysqldump.exe -u acu -pacu_local_dev -h 127.0.0.1 -P 3380 ^
  --default-character-set=utf8mb4 --no-tablespaces acu_cms > acu_cms.sql
```

Then in hPanel → **phpMyAdmin**, select `acu_cms`, and **Import** `acu_cms.sql`.

Alternative for a clean start: point `DATABASE_URL` at the Hostinger database,
enable **Remote MySQL** for your IP, and run `npx prisma db push` +
`npm run seed` from your machine instead of importing.

## 3. Deploy the API

1. hPanel → **Websites → Add Website → Deploy Web App**, pick the `api`
   subdomain, and deploy the `server/` folder (upload a `.zip`, or connect the
   GitHub repo and set the project root to `server/`).
2. Build settings:
   - **Framework:** Express (or "Other")
   - **Entry file:** `src/index.js`
   - **Install:** `npm install`
3. Environment variables (hPanel → **Environment variables**):

   | Name | Value |
   | --- | --- |
   | `DATABASE_URL` | `mysql://USER:PASSWORD@localhost:3306/acu_cms` |
   | `AUTH_SECRET` | a long random string — **change this** |
   | `CORS_ORIGINS` | `https://your-domain.com,https://www.your-domain.com` |
   | `UPLOAD_DIR` | `/home/USERNAME/uploads` (see step 5) |

   Generate a secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```
4. Deploy, then check `https://api.your-domain.com/api/settings` returns JSON.

## 4. Build and upload the site

The site needs the API URL **at build time**:

```bash
# .env.production
VITE_API_BASE=https://api.your-domain.com
```

```bash
npm install --include=dev
npm run build
```

Upload **the contents of `dist/`** (not the folder) into the main domain's
`public_html`, including the hidden `.htaccess` — it makes deep links such as
`/sustainability` and `/admin` work on refresh instead of 404ing.

## 5. Uploads

The API stores images on disk. Hostinger **overwrites the build directory on
every deploy**, so `UPLOAD_DIR` must point somewhere persistent:

```
UPLOAD_DIR=/home/USERNAME/uploads
```

Create that folder in File Manager (or over SSH). Uploads are served by the API
at `/uploads/<file>`.

> **Known issue to fix before launch:** the upload endpoint currently returns a
> *relative* URL (`/uploads/foo.jpg`). With the API on a subdomain the browser
> resolves that against the **site** origin, so images will 404. Either return
> an absolute URL from `server/src/controllers/uploads.js` (deriving it from the
> request, with `app.set("trust proxy", 1)` set in `server/src/app.js`), or set
> a `PUBLIC_BASE_URL` env var and prefix it there.

## 6. First login

- Visit `https://your-domain.com/admin`
- Sign in with `admin@acu.edu.ng` / `adminchangeme`
- **Immediately** change the password in **Users & Roles**

---

## Before you go live — outstanding items

Collected as we built things locally. Nothing here blocks you building the site
out; they all have to be dealt with before it is public.

**Must fix**

1. **Relative upload URLs.** Uploads are stored and returned as `/uploads/foo.jpg`.
   On a subdomain the browser resolves that against the *site* origin and images
   break. See the note in step 5.
2. **Downloads won't "save as".** The `download` attribute on the Reports cards
   is ignored cross-origin, so a PDF opens in a tab instead of downloading. Fix
   by also proxying `/uploads` on the main domain.
3. ~~Authorization is not enforced.~~ **Done.** Write routes now require an
   editor role, user and settings management requires Super Admin, and disabled
   accounts are refused at sign-in *and* on every request. Two notes:
   - Roles are matched by **name**, so when you create a new privileged role,
     add it to `EDITOR_ROLES` / `ADMIN_ROLES` in
     `server/src/controllers/auth.js`. Anything not listed gets no access.
   - Your existing accounts keep working — "Super Admin" is in both lists.
4. **Rate limiting needs the real client IP.** The sign-in limiter keys off the
   request IP, but behind Hostinger's proxy every request appears to come from
   the proxy, so all visitors would share one bucket. Set
   `app.set("trust proxy", 1)` in `server/src/app.js` once you are behind that
   proxy. (Deliberately not set locally — it would let a direct client spoof
   its IP.)
5. **Change the admin password** (`adminchangeme`) and set a real `AUTH_SECRET`.
   Sessions last 8 hours — `expiresIn` in `server/src/controllers/auth.js` —
   and there is currently **no way to revoke a token** short of changing the
   secret, which signs everyone out.
6. **Production env**: `DATABASE_URL`, `AUTH_SECRET`, `CORS_ORIGINS`,
   `UPLOAD_DIR` (must point outside the deploy directory).

**Deferred until the API has a public URL**

6. **Staff self-service.** A Google Form (or an on-site form) posting to a
   `POST /api/staff/ingest` endpoint, matched on email so re-submissions update.
   Google cannot reach `localhost`, so this only works once deployed. Note that
   Google Forms file-upload questions return Drive share links that will not
   render as images — an on-site form avoids that.
7. **Staff accounts.** Give a staff member a login that can edit only their own
   profile. Role enforcement (item 3) is now in place, so adding accounts is
   safe — a new role that isn't in `EDITOR_ROLES` can reach nothing.

**Housekeeping**

8. **Image weight.** The campus photos are 3.5–4.8 MB each, used as the hero and
   gallery backgrounds. Worth compressing or serving WebP.
9. **`vercel.json` and `api/`** are dead weight from the old Vercel setup — safe
   to delete once the deploy is confirmed.
10. **Contact and Admissions forms** do client-side validation only. Connect
    them to something real before accepting submissions.
11. **Staff faculty/department** are plain integer columns with no Prisma
    relations, so names are resolved in the controller. Fine as-is, but real
    relations would be cleaner if you build on it much further.

---

## Things that commonly bite

- **`npm install` skips dev dependencies** if `NODE_ENV=production`, which
  removes `vite` and breaks the build. Use `npm install --include=dev`.
- **Native modules** — `bcrypt` needs a prebuilt binary for the host. If the
  deploy log shows a build failure, swap it for `bcryptjs` (same API:
  `hash` / `compare`), in `server/src/controllers/auth.js`,
  `server/src/controllers/users.js` and `server/prisma/seed.js`.
- **Prisma engine target** — `schema.prisma` uses `provider = "mysql"` and the
  default `native` binary target, which is correct when `prisma generate` runs
  on the host during install.
- **Search** — MySQL's default `utf8mb4_unicode_ci` collation is
  case-insensitive, which is why the `mode: "insensitive"` filters were removed
  from the controllers. That is expected, not a regression.
- **CORS errors in the browser console** — the site origin must be listed in
  `CORS_ORIGINS`.
- **API returns HTML instead of JSON** — the request is hitting the static site
  rather than the API subdomain.
- **Deep links 404** — `.htaccess` wasn't uploaded (hidden files are easy to
  miss).

## Not used any more

`vercel.json` and the `api/` entry points were for the old Vercel deployment.
They're dead weight on this path and can be deleted once the Hostinger deploy is
confirmed working.

# Going live on GoDaddy

The stack is three pieces that deploy differently:

| Piece | What it is | Where it goes on GoDaddy |
| --- | --- | --- |
| Public site | static `dist/` built by Vite | static hosting (`public_html`) **or** served by the API app |
| API | Express + Prisma (Node) | a **GoDaddy Node.js Hosting** app |
| Database | MySQL (`provider = "mysql"`) | a GoDaddy MySQL database |
| Uploads | images/PDFs written to disk | a **persistent** folder (see step 5) |

The API is a long-running Node process with a MySQL database and a Prisma native
engine, so it needs GoDaddy's **Node.js Hosting** product — plain cPanel web
hosting cannot run it.

---

## 0. First: which GoDaddy product do you have?

The steps differ, so identify what you actually bought before doing anything.

| Product | How to tell | Can it run this API? |
| --- | --- | --- |
| **Node.js Hosting** (new, in beta) | You see "Connect GitHub / My Apps / Publish Now" at [godaddy.com/nodejs](https://www.godaddy.com/nodejs) | **Yes** — this is the product for the API. Node 20/22, secrets, per-app Database, persistent `public/assets`, preview → publish. |
| **Linux Web Hosting (cPanel)** | You log into cPanel and see `public_html`, MySQL Databases, phpMyAdmin | Static site ✅ and MySQL ✅ — but **not** a persistent Node process ❌ |
| **VPS / Dedicated** | You have root SSH | **Yes** — most control, most setup (nginx + Node + MySQL) |

**Recommended for this stack:** a **Node.js Hosting** app for the API plus either
the app's Database or a cPanel MySQL database, and the static site served by
either cPanel `public_html` or the Node app itself.

> GoDaddy Node.js Hosting is in **beta** — features may change. Keep the source in
> Git so you can re-deploy.

---

## 1. Deploy shape: one app or two?

**Two apps (fewest code changes)** — use this if you also have cPanel web hosting:

- **API** → a Node.js Hosting app, project root `server/`
- **Site** → upload `dist/` into cPanel `public_html`

This matches how the repo is already structured; the only change is a `build`
script in `server/package.json` (step 3).

**One app** — use this if you *only* have Node.js Hosting:

- The Express app also serves the built SPA (`dist/`) and the SPA fallback.
- Requires a small code change to `server/src/app.js` (step 5b).

Pick one and follow that path throughout.

---

## 2. Create the database

The API needs **MySQL** (Prisma is configured with `provider = "mysql"`).

1. In cPanel → **MySQL Databases**, create `acu_cms` and a user, and grant it all
   privileges on that database.
2. Note the name, user, password and host (usually `localhost`).
3. If your Node.js Hosting app exposes its own **Database** panel, check the
   engine first — only use it if it is MySQL.

### Move the data across

The local database is already MySQL, so it is a straight dump and import.

```bash
# export from the local XAMPP MariaDB
C:\xampp\mysql\bin\mysqldump.exe -u acu -pacu_local_dev -h 127.0.0.1 -P 3380 ^
  --default-character-set=utf8mb4 --no-tablespaces acu_cms > acu_cms.sql
```

Then in cPanel → **phpMyAdmin**, select `acu_cms` and **Import** `acu_cms.sql`.

For a clean start instead: allow your IP under cPanel → **Remote MySQL**, point
`DATABASE_URL` at the GoDaddy database, and run `npx prisma db push` +
`npm run seed` from your machine.

---

## 3. Prepare the API for GoDaddy

GoDaddy's Node.js Hosting has hard requirements. Most are already met; two are
not.

**Already fine in `server/`:**

- Listens on `process.env.PORT` (`src/index.js`). ✅
- `start` script → `node src/index.js`. ✅
- `prisma` is in **dependencies** (not devDependencies), so the `postinstall`
  `prisma generate` runs. ✅ *(GoDaddy installs only `dependencies`.)*

**Changes required:**

1. **Add a `build` script.** GoDaddy always runs `npm run build`; without it the
   deploy fails. In `server/package.json`:
   ```json
   "scripts": {
     "build": "prisma generate",
     "start": "node src/index.js"
   },
   "engines": { "node": "20.x" }
   ```
2. **Exclude `node_modules/`** (and any `.env`) from the zip/Git deploy — the
   platform runs `npm install` itself and will not install `devDependencies`.

**Watch for:**

- **`bcrypt` native binary.** If the build log shows a native compile failure,
  swap it for `bcryptjs` (same `hash`/`compare` API) in
  `server/src/controllers/auth.js`, `server/src/controllers/users.js` and
  `server/prisma/seed.js`.
- **Prisma engine target.** `schema.prisma` uses `provider = "mysql"` with the
  default `native` target — correct when `prisma generate` runs on the host.

---

## 4. Deploy the API (GoDaddy Node.js Hosting)

1. Go to [godaddy.com/nodejs](https://www.godaddy.com/nodejs) → **Connect GitHub**
   (or use *upload as a file* if you are not using GitHub).
2. Pick the **repository** and **branch**. If the repo is the whole project, set
   the **project root to `server/`** so `package.json` is at the top level of the
   app.
3. When prompted, add **secrets** (Environment variables) — see the table in
   step 6. Add at least `DATABASE_URL`, `AUTH_SECRET`, `CORS_ORIGINS` and
   `PUBLIC_BASE_URL`.
4. **Import & Deploy**, open the preview URL, and check
   `https://<preview-url>/api/settings` returns JSON.
5. When it is working, **Publish Now** and attach your `api.` subdomain under
   **Settings → domain**.
6. Use **Runtime Logs** to debug, **File Manager** to inspect files, **Restart
   Preview App** after changing secrets.

> There is a GoDaddy helper skill for preparing projects:
> `npx skills add godaddy/nodejs-hosting-agent-skill` — handy if the deploy
> rejects the app structure.

---

## 5. Build and ship the site

The site needs the API URL **at build time**.

```bash
# .env.production
VITE_API_BASE=https://api.your-domain.com

npm install --include=dev   # vite is a devDependency — do not let NODE_ENV strip it
npm run build
```

### 5a. Two-app path — upload `dist/` to cPanel

Upload **the contents of `dist/`** (not the folder) into the main domain's
`public_html`, **including the hidden `.htaccess`** — it makes deep links such as
`/sustainability`, `/student-life` and `/admin` work on refresh instead of 404ing.

### 5b. One-app path — let Express serve the SPA

Add static serving + SPA fallback to `server/src/app.js`, after the API routes:

```js
const path = require("path");
const distDir = path.join(__dirname, "..", "..", "dist");

app.use(express.static(distDir));
app.get(/^(?!\/(api|uploads)).*/, (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});
```

Then commit/locally build `dist/` so it is present in the app, and the single
app serves both the API and the site.

---

## 6. Environment variables (secrets)

Set these in the Node.js Hosting app's **Settings → secrets** (never commit a
real `.env`).

| Name | Value |
| --- | --- |
| `DATABASE_URL` | `mysql://USER:PASSWORD@HOST:3306/acu_cms` |
| `AUTH_SECRET` | a long random string — **change this** |
| `CORS_ORIGINS` | `https://your-domain.com,https://www.your-domain.com` |
| `PUBLIC_BASE_URL` | `https://api.your-domain.com` (so upload URLs are absolute) |
| `TRUST_PROXY` | `1` (you are behind GoDaddy's proxy — needed for rate limiting) |
| `UPLOAD_DIR` | persistent folder — see step 7 |

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

---

## 7. Uploads must survive deployments

Uploads are written to disk (`server/src/controllers/uploads.js`). On GoDaddy,
app files are replaced on each deploy, so uploads must go to a folder that
persists — GoDaddy says to use the app's **`public/assets`** folder.

1. Set `UPLOAD_DIR` to that folder (e.g. `<app>/public/assets/uploads`).
2. Make the API serve uploads from `UPLOAD_DIR` rather than the hard-coded
   `<repo>/uploads` in `server/src/app.js`:
   ```js
   const uploadsDir = process.env.UPLOAD_DIR || path.join(__dirname, "..", "..", "uploads");
   app.use("/uploads", express.static(uploadsDir));
   ```
3. Alternatively set `BLOB_READ_WRITE_TOKEN` to store uploads off-box entirely.

> **Upload URLs:** the API already returns absolute URLs via `PUBLIC_BASE_URL`
> (falling back to the request host), so images load from the API host. Without
> `PUBLIC_BASE_URL` set they can resolve against the wrong origin.

---

## 8. Domain and DNS

- If the domain is registered at GoDaddy, attach it to the app/site in the
  product's **Settings** and DNS is handled for you.
- Otherwise point the domain's **A record** at the hosting IP and the `api`
  subdomain at the API app.
- Make sure `CORS_ORIGINS` lists the exact site origin(s), including `www`, and
  use **https**.

---

## 9. First login

- Visit `https://your-domain.com/admin`
- Sign in with `admin@acu.edu.ng` / `adminchangeme`
- **Immediately** change the password in **Users & Roles**

---

## Before you go live — outstanding items

**Must fix**

1. **Change the admin password** (`adminchangeme`) and set a real `AUTH_SECRET`.
   Sessions last 8 hours (`expiresIn` in `server/src/controllers/auth.js`) and
   there is no token revocation short of changing the secret.
2. **`TRUST_PROXY=1`** behind GoDaddy's proxy, or all visitors share one rate-limit
   bucket and `req.protocol` reports `http`.
3. **Downloads won't "save as".** The `download` attribute is ignored
   cross-origin, so a PDF opens in a tab — proxy `/uploads` on the main domain if
   you need real downloads.
4. **Contact and Admissions forms** validate on the client only. Connect them to
   something real before accepting submissions.
5. **Roles are matched by name** — when you add a privileged role, add it to
   `EDITOR_ROLES` / `ADMIN_ROLES` in `server/src/controllers/auth.js`.

**Housekeeping**

6. **Image weight** — campus photos are 3.5–4.8 MB each. Compress or serve WebP.
7. **`vercel.json` and `api/`** are dead weight from the old Vercel setup — safe
   to delete once the GoDaddy deploy is confirmed.
8. **Staff faculty/department** are integer columns with no Prisma relations;
   names are resolved in the controller. Fine as-is.

---

## Things that commonly bite

- **`MODULE_NOT_FOUND` at startup** — a runtime package is in `devDependencies`.
  GoDaddy installs only `dependencies`.
- **Deploy fails at build** — no `build` script in `package.json`. Add
  `"build": "prisma generate"`.
- **App receives no traffic** — it is not reading `process.env.PORT`.
- **`npm install` skipped `vite`** for the SPA build — `NODE_ENV=production`
  strips devDependencies; build with `npm install --include=dev`.
- **Native module build failure** — `bcrypt`; switch to `bcryptjs`.
- **CORS errors in the console** — the site origin is missing from `CORS_ORIGINS`.
- **API returns HTML instead of JSON** — the request hit the site, not the API
  subdomain.
- **Deep links 404** (two-app path) — `.htaccess` wasn't uploaded (hidden files
  are easy to miss).
- **Uploaded images vanish after a deploy** — `UPLOAD_DIR` isn't persistent; use
  `public/assets`.

## Not used any more

`vercel.json` and the `api/` entry points were for the old Vercel deployment.
They are dead weight on this path and can be deleted once the GoDaddy deploy is
confirmed working.

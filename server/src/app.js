require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const routes = require("./routes");
const { optionalAuth } = require("./controllers/auth");

const app = express();

// Baseline security headers on every response. On Vercel the static site also
// gets these from vercel.json; on any other host (a VM running this server
// directly) helmet is what protects both the API and the bundled SPA. The CSP
// mirrors vercel.json — keep the two in step.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "https:", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", "https:"],
        frameSrc: [
          "'self'",
          "https://www.google.com",
          "https://www.youtube.com",
          "https://www.youtube-nocookie.com",
          "https://*.public.blob.vercel-storage.com",
        ],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
      },
    },
    // Uploads are served from the API origin and embedded by the site even when
    // the two are hosted separately, so they must stay cross-origin readable.
    crossOriginResourcePolicy: { policy: "cross-origin" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }),
);

// helmet ships no Permissions-Policy; send the same one vercel.json uses.
app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  );
  next();
});

// Behind a reverse proxy (Hostinger, nginx, …) Express must trust the
// X-Forwarded-* headers, or every request appears to come from the proxy — the
// sign-in rate limiter would then share one bucket across all visitors, and
// req.protocol would report http. Only enabled when TRUST_PROXY is set, because
// trusting proxy headers on a directly-exposed server lets clients spoof their IP.
if (process.env.TRUST_PROXY) {
  const value = process.env.TRUST_PROXY;
  app.set("trust proxy", value === "true" ? 1 : value);
}

// Comma-separated list of allowed origins (e.g. the Hostinger site URL).
// When unset, all origins are allowed (convenient for local development).
const corsOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(cors(corsOrigins.length ? { origin: corsOrigins } : {}));

app.use(express.json({ limit: "8mb" }));

// Uploads live outside the code so they survive redeploys. Point UPLOAD_DIR at a
// persistent folder on the host; locally it falls back to <repo>/uploads.
const uploadsDir =
  process.env.UPLOAD_DIR || path.join(__dirname, "..", "..", "uploads");
app.use("/uploads", express.static(uploadsDir));

// Recognise an editor on the shared GET routes without requiring a token, so
// the admin (which sends one) can read drafts while the public site cannot.
app.use("/api", optionalAuth);
app.use("/api", routes);

// Single-app deploys bundle the built SPA next to the API: serve it and fall
// back to index.html so client-side routes resolve on refresh. Skipped in dev,
// where Vite serves the site, and whenever dist/ has not been built.
const distDir = path.join(__dirname, "..", "..", "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^\/(?!api(\/|$)|uploads(\/|$)).*/, (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

// Central error handler so a rejected handler returns a response instead of
// crashing the process. Prisma's known codes are mapped to sensible statuses so
// a duplicate unique value is a 409 and a missing row is a 404, not a bare 500.
app.use((err, req, res, _next) => {
  const status =
    err.status ||
    err.statusCode ||
    (err.code === "P2002" ? 409 : err.code === "P2025" ? 404 : 500);

  if (status >= 500) console.error(err);

  const message =
    err.code === "P2002"
      ? "A record with that unique value already exists"
      : err.code === "P2025"
        ? "Not found"
        : status < 500
          ? err.message
          : "Server error";

  res.status(status).json({ error: message });
});

module.exports = app;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

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
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "uploads")),
);

app.use("/api", routes);

// Central error handler so a rejected handler returns a response instead of
// crashing the process.
app.use((err, req, res, _next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: status < 500 ? err.message : "Server error",
  });
});

module.exports = app;

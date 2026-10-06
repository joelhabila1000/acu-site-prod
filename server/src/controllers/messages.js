const rateLimit = require("express-rate-limit");
const prisma = require("../lib/prisma");

const SOURCES = ["contact", "admissions"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The submission endpoint is public, so cap it. Without this the inbox (and the
// database) can be flooded by a script.
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages sent. Please try again later." },
});

function clean(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

async function create(req, res) {
  const body = req.body || {};
  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const message = clean(body.message, 4000);
  const source = SOURCES.includes(body.source) ? body.source : "contact";

  if (!name) return res.status(400).json({ error: "Please enter your name." });
  if (!EMAIL_RE.test(email))
    return res.status(400).json({ error: "Please enter a valid email address." });
  if (!message)
    return res.status(400).json({ error: "Please enter a message." });

  const saved = await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone: clean(body.phone, 40) || null,
      programme: clean(body.programme, 160) || null,
      subject: clean(body.subject, 200) || null,
      message,
      source,
      ip: req.ip || null,
    },
  });

  res.status(201).json({ id: saved.id, ok: true });
}

async function list(req, res) {
  const { q, status, source } = req.query;
  const where = {};
  if (status) where.status = status;
  if (source) where.source = source;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { subject: { contains: q } },
      { programme: { contains: q } },
      { message: { contains: q } },
    ];
  }
  const items = await prisma.contactMessage.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.contactMessage.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

// Only the triage fields are editable — the sender's original wording is kept.
const WRITABLE = ["status", "subject", "programme", "phone"];

async function update(req, res) {
  const id = Number(req.params.id);
  const data = {};
  for (const key of WRITABLE) {
    if (req.body[key] !== undefined) data[key] = req.body[key];
  }
  const updated = await prisma.contactMessage.update({ where: { id }, data });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.contactMessage.delete({ where: { id } });
  res.json({ success: true });
}

function handle(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = {
  submitLimiter,
  create: handle(create),
  list: handle(list),
  get: handle(get),
  update: handle(update),
  remove: handle(remove),
};

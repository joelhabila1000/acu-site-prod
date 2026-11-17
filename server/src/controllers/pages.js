const prisma = require("../lib/prisma");
const {
  applyPublicListFilter,
  isPubliclyVisible,
} = require("../lib/visibility");

// Fields an editor can set. Everything else (ids, timestamps) is owned by the
// database, so a stray key in the body is ignored rather than trusted.
const WRITABLE = [
  "path",
  "title",
  "crumb",
  "lede",
  "sections",
  "facts",
  "links",
  "calendar",
  "ctaLabel",
  "ctaHref",
  "ctaExternal",
  "attachmentUrl",
  "attachmentName",
  "attachmentSize",
  "attachmentType",
  "status",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  return data;
}

// Routes always start with a slash; typing "student-services/x" in the admin
// should still produce a link the router can match.
function cleanPath(value) {
  const path = String(value || "").trim();
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function normalise(data) {
  if (data.path !== undefined) data.path = cleanPath(data.path);
  if (data.ctaExternal !== undefined) data.ctaExternal = Boolean(data.ctaExternal);
  if (data.attachmentSize !== undefined)
    data.attachmentSize = Number(data.attachmentSize) || 0;
  return data;
}

async function list(req, res) {
  const { status } = req.query;
  const where = {};
  applyPublicListFilter(req, where, status, "published");
  const items = await prisma.page.findMany({ where, orderBy: { path: "asc" } });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.page.findUnique({ where: { id } });
  if (!item || !isPubliclyVisible(req, item, "published"))
    return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const data = normalise(pick(req.body));
  if (!data.path || !data.title)
    return res.status(400).json({ error: "Path and title required" });
  const created = await prisma.page.create({ data });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const data = normalise(pick(req.body));
  const updated = await prisma.page.update({ where: { id }, data });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.page.delete({ where: { id } });
  res.json({ success: true });
}

function handle(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = {
  list: handle(list),
  get: handle(get),
  create: handle(create),
  update: handle(update),
  remove: handle(remove),
};

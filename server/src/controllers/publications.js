const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Free-text columns that should store null rather than an empty string.
const OPTIONAL_TEXT = [
  "venue",
  "volume",
  "issue",
  "pages",
  "doi",
  "url",
  "abstract",
  "faculty",
  "fileUrl",
];

const WRITABLE = [
  "title",
  "authors",
  "publicationType",
  "venue",
  "year",
  "volume",
  "issue",
  "pages",
  "doi",
  "url",
  "abstract",
  "faculty",
  "fileUrl",
  "featured",
  "status",
  "sortOrder",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if ("year" in data) {
    const year = Number(data.year);
    data.year = Number.isFinite(year) && year > 0 ? Math.trunc(year) : null;
  }
  if ("sortOrder" in data) data.sortOrder = Number(data.sortOrder) || 0;
  if ("featured" in data) data.featured = Boolean(data.featured);
  for (const key of OPTIONAL_TEXT) {
    if (data[key] === "") data[key] = null;
  }
  return data;
}

async function list(req, res) {
  const { q, status, year, type } = req.query;
  const where = {};
  if (status) where.status = status;
  if (type) where.publicationType = type;
  if (year) where.year = Number(year);
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { authors: { contains: q } },
      { venue: { contains: q } },
    ];
  }
  const items = await prisma.publication.findMany({
    where,
    orderBy: [{ year: "desc" }, { sortOrder: "asc" }, { id: "desc" }],
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.publication.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { title, authors } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  if (!authors) return res.status(400).json({ error: "Authors are required" });
  const created = await prisma.publication.create({ data: pick(req.body) });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const updated = await prisma.publication.update({
    where: { id },
    data: pick(req.body),
  });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.publication.delete({ where: { id } });
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

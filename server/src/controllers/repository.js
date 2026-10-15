const prisma = require("../lib/prisma");
const slugify = require("slugify");

// Free-text columns that should store null rather than an empty string.
const OPTIONAL_TEXT = [
  "abstract",
  "keywords",
  "faculty",
  "department",
  "degree",
  "supervisor",
  "publisher",
  "doi",
  "language",
  "fileUrl",
  "fileName",
  "fileType",
];

const WRITABLE = [
  "title",
  "slug",
  "itemType",
  "authors",
  "abstract",
  "keywords",
  "faculty",
  "department",
  "year",
  "degree",
  "supervisor",
  "publisher",
  "doi",
  "language",
  "fileUrl",
  "fileName",
  "fileType",
  "fileSize",
  "featured",
  "status",
  "publishedAt",
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
  if ("fileSize" in data) data.fileSize = Number(data.fileSize) || 0;
  if ("featured" in data) data.featured = Boolean(data.featured);
  if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
  for (const key of OPTIONAL_TEXT) {
    if (data[key] === "") data[key] = null;
  }
  return data;
}

// Slugs are public URLs, so keep the first one and only add a suffix when the
// title genuinely collides with an existing record.
async function uniqueSlug(title) {
  const base = slugify(title, { lower: true, strict: true }) || "item";
  const existing = await prisma.repositoryItem.findUnique({
    where: { slug: base },
  });
  return existing ? `${base}-${Date.now().toString().slice(-4)}` : base;
}

async function list(req, res) {
  const { q, status, type, faculty, year, limit } = req.query;
  const where = {};
  if (status) where.status = status;
  if (type) where.itemType = type;
  if (faculty) where.faculty = faculty;
  if (year) where.year = Number(year);
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { authors: { contains: q } },
      { abstract: { contains: q } },
      { keywords: { contains: q } },
    ];
  }
  const items = await prisma.repositoryItem.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }, { id: "desc" }],
    take: limit ? Number(limit) : undefined,
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.repositoryItem.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { title, itemType, authors } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  if (!itemType) return res.status(400).json({ error: "Type is required" });
  if (!authors) return res.status(400).json({ error: "Authors are required" });
  const data = pick(req.body);
  if (!data.slug) data.slug = await uniqueSlug(title);
  if (data.status === "published" && !data.publishedAt) {
    data.publishedAt = new Date();
  }
  const created = await prisma.repositoryItem.create({
    data: { ...data, uploadedBy: req.user && req.user.userId },
  });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const data = pick(req.body);
  if (!data.slug && data.title) data.slug = await uniqueSlug(data.title);
  if (data.status === "published" && !data.publishedAt) {
    data.publishedAt = new Date();
  }
  const updated = await prisma.repositoryItem.update({ where: { id }, data });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.repositoryItem.delete({ where: { id } });
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

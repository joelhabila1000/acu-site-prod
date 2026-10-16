const prisma = require("../lib/prisma");
const slugify = require("slugify");
const {
  applyPublicListFilter,
  isPubliclyVisible,
} = require("../lib/visibility");

// Free-text columns that should store null rather than an empty string.
const OPTIONAL_TEXT = [
  "isbn",
  "publisher",
  "edition",
  "subject",
  "callNumber",
  "description",
  "coverImage",
  "language",
  "fileUrl",
  "fileName",
  "fileType",
  "externalUrl",
];

const WRITABLE = [
  "title",
  "slug",
  "authors",
  "isbn",
  "publisher",
  "publishedYear",
  "edition",
  "resourceType",
  "subject",
  "callNumber",
  "description",
  "coverImage",
  "language",
  "branchId",
  "availability",
  "copies",
  "availableCopies",
  "fileUrl",
  "fileName",
  "fileType",
  "fileSize",
  "externalUrl",
  "featured",
  "sortOrder",
  "status",
  "publishedAt",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if ("publishedYear" in data) {
    const year = Number(data.publishedYear);
    data.publishedYear = Number.isFinite(year) && year > 0 ? Math.trunc(year) : null;
  }
  if ("branchId" in data) {
    const branch = Number(data.branchId);
    data.branchId = Number.isFinite(branch) && branch > 0 ? Math.trunc(branch) : null;
  }
  if ("copies" in data) data.copies = Math.max(0, Number(data.copies) || 0);
  if ("availableCopies" in data) {
    data.availableCopies = Math.max(0, Number(data.availableCopies) || 0);
  }
  if ("sortOrder" in data) data.sortOrder = Number(data.sortOrder) || 0;
  if ("fileSize" in data) data.fileSize = Number(data.fileSize) || 0;
  if ("featured" in data) data.featured = Boolean(data.featured);
  if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
  for (const key of OPTIONAL_TEXT) {
    if (data[key] === "") data[key] = null;
  }
  return data;
}

async function uniqueSlug(title) {
  const base = slugify(title, { lower: true, strict: true }) || "record";
  const existing = await prisma.libraryBook.findUnique({ where: { slug: base } });
  return existing ? `${base}-${Date.now().toString().slice(-4)}` : base;
}

async function list(req, res) {
  const { q, status, type, subject, branch, availability, featured, limit } =
    req.query;
  const where = {};
  applyPublicListFilter(req, where, status, "published");
  if (type) where.resourceType = type;
  if (subject) where.subject = subject;
  if (availability) where.availability = availability;
  if (featured === "true" || featured === "1") where.featured = true;
  if (branch) {
    const branchId = Number(branch);
    if (Number.isFinite(branchId)) where.branchId = branchId;
  }
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { authors: { contains: q, mode: "insensitive" } },
      { isbn: { contains: q, mode: "insensitive" } },
      { subject: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }
  const items = await prisma.libraryBook.findMany({
    where,
    include: { branch: { select: { id: true, name: true, campus: true } } },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    take: limit ? Number(limit) : undefined,
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.libraryBook.findUnique({
    where: { id },
    include: { branch: { select: { id: true, name: true, campus: true } } },
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  if (!isPubliclyVisible(req, item, "published"))
    return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { title, authors } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  if (!authors) return res.status(400).json({ error: "Author(s) are required" });
  const data = pick(req.body);
  if (!data.slug) data.slug = await uniqueSlug(title);
  if (data.status === "published" && !data.publishedAt) {
    data.publishedAt = new Date();
  }
  const created = await prisma.libraryBook.create({ data });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const data = pick(req.body);
  if (!data.slug && data.title) data.slug = await uniqueSlug(data.title);
  if (data.status === "published" && !data.publishedAt) {
    data.publishedAt = new Date();
  }
  const updated = await prisma.libraryBook.update({ where: { id }, data });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.libraryBook.delete({ where: { id } });
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

const prisma = require("../lib/prisma");
const slugify = require("slugify");

const OPTIONAL_TEXT = ["summary", "description", "icon"];

const WRITABLE = [
  "title",
  "slug",
  "summary",
  "description",
  "icon",
  "sortOrder",
  "status",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if ("sortOrder" in data) data.sortOrder = Number(data.sortOrder) || 0;
  for (const key of OPTIONAL_TEXT) {
    if (data[key] === "") data[key] = null;
  }
  return data;
}

async function uniqueSlug(title) {
  const base = slugify(title, { lower: true, strict: true }) || "service";
  const existing = await prisma.libraryService.findUnique({
    where: { slug: base },
  });
  return existing ? `${base}-${Date.now().toString().slice(-4)}` : base;
}

async function list(req, res) {
  const { status } = req.query;
  const where = {};
  if (status) where.status = status;
  const items = await prisma.libraryService.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.libraryService.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const data = pick(req.body);
  if (!data.slug) data.slug = await uniqueSlug(title);
  const created = await prisma.libraryService.create({ data });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const data = pick(req.body);
  if (!data.slug && data.title) data.slug = await uniqueSlug(data.title);
  const updated = await prisma.libraryService.update({ where: { id }, data });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.libraryService.delete({ where: { id } });
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

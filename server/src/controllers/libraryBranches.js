const prisma = require("../lib/prisma");
const slugify = require("slugify");

const OPTIONAL_TEXT = [
  "campus",
  "address",
  "phone",
  "email",
  "mapEmbed",
  "image",
];

const WRITABLE = [
  "name",
  "slug",
  "campus",
  "address",
  "phone",
  "email",
  "mapEmbed",
  "image",
  "hours",
  "sortOrder",
  "status",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if ("sortOrder" in data) data.sortOrder = Number(data.sortOrder) || 0;
  if ("hours" in data && !Array.isArray(data.hours)) data.hours = [];
  for (const key of OPTIONAL_TEXT) {
    if (data[key] === "") data[key] = null;
  }
  return data;
}

async function uniqueSlug(name) {
  const base = slugify(name, { lower: true, strict: true }) || "branch";
  const existing = await prisma.libraryBranch.findUnique({
    where: { slug: base },
  });
  return existing ? `${base}-${Date.now().toString().slice(-4)}` : base;
}

async function list(req, res) {
  const { status } = req.query;
  const where = {};
  if (status) where.status = status;
  const items = await prisma.libraryBranch.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.libraryBranch.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const data = pick(req.body);
  if (!data.slug) data.slug = await uniqueSlug(name);
  const created = await prisma.libraryBranch.create({ data });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const data = pick(req.body);
  if (!data.slug && data.name) data.slug = await uniqueSlug(data.name);
  const updated = await prisma.libraryBranch.update({ where: { id }, data });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.libraryBranch.delete({ where: { id } });
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

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugify = require("slugify");

const WRITABLE = [
  "slug",
  "name",
  "role",
  "image",
  "summary",
  "bio",
  "qualifications",
  "memberships",
  "sortOrder",
  "status",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if (data.sortOrder !== undefined) data.sortOrder = Number(data.sortOrder) || 0;
  return data;
}

async function list(req, res) {
  const { q, status } = req.query;
  const where = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { role: { contains: q, mode: "insensitive" } },
    ];
  }
  const items = await prisma.principalOfficer.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.principalOfficer.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { name, role } = req.body;
  if (!name || !role)
    return res.status(400).json({ error: "Name and role required" });
  const data = pick(req.body);
  if (!data.slug) data.slug = slugify(name, { lower: true, strict: true });
  const created = await prisma.principalOfficer.create({ data });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const body = pick(req.body);
  if (body.name && !body.slug) {
    body.slug = slugify(body.name, { lower: true, strict: true });
  }
  const updated = await prisma.principalOfficer.update({ where: { id }, data: body });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.principalOfficer.delete({ where: { id } });
  res.json({ success: true });
}

module.exports = { list, get, create, update, remove };

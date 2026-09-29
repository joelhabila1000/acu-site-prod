const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const WRITABLE = [
  "title",
  "description",
  "category",
  "fileUrl",
  "fileName",
  "fileType",
  "fileSize",
  "status",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if (data.fileSize !== undefined) data.fileSize = Number(data.fileSize) || 0;
  return data;
}

async function list(req, res) {
  const { q, status, category } = req.query;
  const where = {};
  if (status) where.status = status;
  if (category) where.category = category;
  if (q) {
    where.OR = [{ title: { contains: q } }, { description: { contains: q } }];
  }
  const items = await prisma.document.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.document.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { title, fileUrl } = req.body;
  if (!title || !fileUrl)
    return res.status(400).json({ error: "Title and file are required" });
  const created = await prisma.document.create({
    data: { ...pick(req.body), uploadedBy: req.user && req.user.userId },
  });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const updated = await prisma.document.update({
    where: { id },
    data: pick(req.body),
  });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.document.delete({ where: { id } });
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

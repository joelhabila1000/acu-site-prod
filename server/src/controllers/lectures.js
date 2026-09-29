const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const WRITABLE = [
  "number",
  "lecturer",
  "lecturerRole",
  "title",
  "summary",
  "lectureDate",
  "venue",
  "fileUrl",
  "status",
  "sortOrder",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if ("number" in data) data.number = Number(data.number) || 0;
  if ("sortOrder" in data) data.sortOrder = Number(data.sortOrder) || 0;
  if (data.lectureDate === "" || data.lectureDate === null) {
    data.lectureDate = null;
  } else if (data.lectureDate !== undefined) {
    data.lectureDate = new Date(data.lectureDate);
  }
  return data;
}

async function list(req, res) {
  const { q, status } = req.query;
  const where = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [{ title: { contains: q } }, { lecturer: { contains: q } }];
  }
  const items = await prisma.inauguralLecture.findMany({
    where,
    orderBy: [{ number: "desc" }, { id: "desc" }],
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.inauguralLecture.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { number } = req.body;
  if (!number)
    return res.status(400).json({ error: "Lecture number is required" });
  const created = await prisma.inauguralLecture.create({ data: pick(req.body) });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const updated = await prisma.inauguralLecture.update({
    where: { id },
    data: pick(req.body),
  });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.inauguralLecture.delete({ where: { id } });
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

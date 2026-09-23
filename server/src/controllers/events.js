const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const WRITABLE = [
  "title",
  "description",
  "image",
  "eventDate",
  "startTime",
  "endTime",
  "venue",
  "status",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if (data.eventDate !== undefined) data.eventDate = new Date(data.eventDate);
  if (data.status === "published" && !data.eventDate) {
    data.eventDate = new Date();
  }
  return data;
}

async function list(req, res) {
  const { q, status, limit } = req.query;
  const where = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }
  const items = await prisma.event.findMany({
    where,
    orderBy: { eventDate: "desc" },
    take: limit ? Number(limit) : undefined,
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.event.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(400).json({ error: "Title and description required" });
  const created = await prisma.event.create({ data: pick(req.body) });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const updated = await prisma.event.update({
    where: { id },
    data: pick(req.body),
  });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.event.delete({ where: { id } });
  res.json({ success: true });
}

module.exports = { list, get, create, update, remove };

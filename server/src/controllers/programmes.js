const prisma = require("../lib/prisma");

const WRITABLE = ["name", "award", "faculty", "status", "sortOrder"];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if ("sortOrder" in data) data.sortOrder = Number(data.sortOrder) || 0;
  return data;
}

async function list(req, res) {
  const { q, status, faculty, award } = req.query;
  const where = {};
  if (status) where.status = status;
  if (faculty) where.faculty = faculty;
  if (award) where.award = award;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { award: { contains: q } },
      { faculty: { contains: q } },
    ];
  }
  const items = await prisma.postgraduateProgramme.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.postgraduateProgramme.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { name, award, faculty } = req.body;
  if (!name || !award || !faculty)
    return res
      .status(400)
      .json({ error: "Name, award and faculty are required" });
  const created = await prisma.postgraduateProgramme.create({
    data: pick(req.body),
  });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const updated = await prisma.postgraduateProgramme.update({
    where: { id },
    data: pick(req.body),
  });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.postgraduateProgramme.delete({ where: { id } });
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

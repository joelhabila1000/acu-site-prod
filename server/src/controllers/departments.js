const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugify = require("slugify");

const WRITABLE = [
  "slug",
  "name",
  "description",
  "facultyId",
  "headOfDepartment",
  "email",
  "phone",
  "status",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if ("facultyId" in data) data.facultyId = Number(data.facultyId) || 0;
  return data;
}

// Public read: used by the site, and by the admin pickers on the Staff form.
async function list(req, res) {
  const { q, status, facultyId } = req.query;
  const where = {};
  if (status) where.status = status;
  if (facultyId) where.facultyId = Number(facultyId);
  if (q) {
    where.OR = [{ name: { contains: q } }, { description: { contains: q } }];
  }

  const items = await prisma.department.findMany({
    where,
    orderBy: [{ name: "asc" }, { id: "asc" }],
    include: { faculty: { select: { id: true, name: true } } },
  });

  res.json({
    data: items.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description || "",
      facultyId: row.facultyId,
      facultyName: row.faculty ? row.faculty.name : "",
      headOfDepartment: row.headOfDepartment || "",
      email: row.email || "",
      phone: row.phone || "",
      status: row.status,
    })),
    total: items.length,
  });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.department.findUnique({
    where: { id },
    include: { faculty: { select: { id: true, name: true } } },
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ ...item, facultyName: item.faculty ? item.faculty.name : "" });
}

async function create(req, res) {
  const { name, facultyId } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  if (!Number(facultyId))
    return res.status(400).json({ error: "Faculty is required" });

  const data = pick(req.body);
  if (!data.slug) data.slug = slugify(name, { lower: true, strict: true });

  // slug is unique, and department names repeat across faculties.
  const existing = await prisma.department.findUnique({ where: { slug: data.slug } });
  if (existing) data.slug = `${data.slug}-${data.facultyId}`;

  const created = await prisma.department.create({ data });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const body = pick(req.body);
  if (body.name && !body.slug) {
    body.slug = slugify(body.name, { lower: true, strict: true });
  }
  const updated = await prisma.department.update({ where: { id }, data: body });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.department.delete({ where: { id } });
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

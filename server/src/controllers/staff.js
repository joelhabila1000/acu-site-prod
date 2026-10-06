const prisma = require("../lib/prisma");
const slugify = require("slugify");

const WRITABLE = [
  "slug",
  "title",
  "name",
  "position",
  "staffType",
  "profileImage",
  "facultyId",
  "departmentId",
  "unit",
  "biography",
  "email",
  "phone",
  "linkedin",
  "orcid",
  "googleScholar",
  "scopus",
  "researchGate",
  "academia",
  "webOfScience",
  "ssrn",
  "status",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  // Faculty/department are optional relations: "" from the picker means
  // "unset", so normalise before writing to an Int column.
  for (const key of ["facultyId", "departmentId"]) {
    if (key in data) {
      const value = Number(data[key]);
      data[key] = Number.isInteger(value) && value > 0 ? value : null;
    }
  }
  return data;
}

// The Staff table stores faculty/department as plain ids (no relations), so
// resolve the display names here rather than in the client.
async function list(req, res) {
  const { q, status, facultyId, departmentId, staffType } = req.query;
  const where = {};
  if (status) where.status = status;
  if (staffType) where.staffType = staffType;
  if (facultyId) where.facultyId = Number(facultyId);
  if (departmentId) where.departmentId = Number(departmentId);
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { position: { contains: q } },
      { unit: { contains: q } },
      { biography: { contains: q } },
    ];
  }

  const [items, faculties, departments] = await Promise.all([
    prisma.staff.findMany({ where, orderBy: [{ name: "asc" }, { id: "asc" }] }),
    prisma.faculty.findMany({ select: { id: true, name: true } }),
    prisma.department.findMany({ select: { id: true, name: true } }),
  ]);

  const facultyNames = new Map(faculties.map((row) => [row.id, row.name]));
  const departmentNames = new Map(departments.map((row) => [row.id, row.name]));

  res.json({
    data: items.map((person) => ({
      ...person,
      facultyName: facultyNames.get(person.facultyId) || "",
      departmentName: departmentNames.get(person.departmentId) || "",
    })),
    total: items.length,
  });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.staff.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });

  const [faculty, department] = await Promise.all([
    item.facultyId
      ? prisma.faculty.findUnique({ where: { id: item.facultyId } })
      : null,
    item.departmentId
      ? prisma.department.findUnique({ where: { id: item.departmentId } })
      : null,
  ]);

  res.json({
    ...item,
    facultyName: faculty ? faculty.name : "",
    departmentName: department ? department.name : "",
  });
}

async function create(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const data = pick(req.body);
  if (!data.slug) data.slug = slugify(name, { lower: true, strict: true });
  const created = await prisma.staff.create({ data });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const body = pick(req.body);
  if (body.name && !body.slug) {
    body.slug = slugify(body.name, { lower: true, strict: true });
  }
  const updated = await prisma.staff.update({ where: { id }, data: body });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.staff.delete({ where: { id } });
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

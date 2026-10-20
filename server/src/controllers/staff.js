const prisma = require("../lib/prisma");
const slugify = require("slugify");
const csv = require("../lib/csv");
const {
  applyPublicListFilter,
  isPubliclyVisible,
} = require("../lib/visibility");

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
  applyPublicListFilter(req, where, status, "active");
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
  if (!isPubliclyVisible(req, item, "active"))
    return res.status(404).json({ error: "Not found" });

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

// --- Bulk import (CSV) -----------------------------------------------------

// Maps a (normalised) CSV header onto the field it fills. Aliases let people
// keep whatever headings their spreadsheet already uses.
const COLUMN_ALIASES = {
  slug: "slug",
  title: "title",
  name: "name",
  fullname: "name",
  position: "position",
  post: "position",
  stafftype: "staffType",
  type: "staffType",
  faculty: "faculty",
  department: "department",
  dept: "department",
  unit: "unit",
  section: "unit",
  profileimage: "profileImage",
  photograph: "profileImage",
  photo: "profileImage",
  image: "profileImage",
  picture: "profileImage",
  email: "email",
  emailaddress: "email",
  phone: "phone",
  phonenumber: "phone",
  tel: "phone",
  telephone: "phone",
  linkedin: "linkedin",
  orcid: "orcid",
  googlescholar: "googleScholar",
  scholar: "googleScholar",
  scopus: "scopus",
  researchgate: "researchGate",
  academia: "academia",
  webofscience: "webOfScience",
  publons: "webOfScience",
  wos: "webOfScience",
  ssrn: "ssrn",
  biography: "biography",
  bio: "biography",
  status: "status",
};

// Free-text columns copied across verbatim when the cell is not empty.
const TEXT_FIELDS = [
  "title",
  "position",
  "unit",
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
  "biography",
  "profileImage",
];

const MAX_IMPORT_ROWS = 2000;

function normalizeKey(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeName(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function buildNameIndex(rows) {
  const index = new Map();
  for (const row of rows) {
    const key = normalizeName(row.name);
    if (key && !index.has(key)) index.set(key, row.id);
  }
  return index;
}

// "Faculty of Science" and "Science" should both find the same row.
function lookupName(index, value) {
  const key = normalizeName(value);
  if (index.has(key)) return index.get(key);
  const stripped = key.replace(/^(faculty|department|college|school) of\s+/, "");
  return index.has(stripped) ? index.get(stripped) : null;
}

function uniqueSlug(base, used) {
  if (!used.has(base)) return base;
  let n = 2;
  while (used.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

function parseStaffType(value) {
  return String(value || "").toLowerCase().includes("non")
    ? "non-academic"
    : "academic";
}

// Creates staff rows from a CSV document. Rows with no name are reported back
// rather than created; an unrecognised faculty/department is a warning (the row
// is still imported, with that reference left blank). Pass dryRun to check a
// file without writing anything.
async function importMany(req, res) {
  const body = req.body || {};
  const source = typeof body.csv === "string" ? body.csv : "";
  const dryRun = Boolean(body.dryRun);

  if (!source.trim()) {
    return res.status(400).json({ error: "CSV content is required" });
  }

  const { header, records } = csv.toObjects(csv.parse(source));
  const mapped = header.map((key) => COLUMN_ALIASES[normalizeKey(key)]);
  if (!mapped.includes("name")) {
    return res.status(400).json({ error: 'The CSV needs a "name" column' });
  }
  if (records.length > MAX_IMPORT_ROWS) {
    return res
      .status(400)
      .json({ error: `Too many rows — import at most ${MAX_IMPORT_ROWS} at a time` });
  }

  const [faculties, departments, existing] = await Promise.all([
    prisma.faculty.findMany({ select: { id: true, name: true } }),
    prisma.department.findMany({ select: { id: true, name: true } }),
    prisma.staff.findMany({ select: { slug: true } }),
  ]);

  const facultyIndex = buildNameIndex(faculties);
  const departmentIndex = buildNameIndex(departments);
  const usedSlugs = new Set(existing.map((row) => row.slug));

  const errors = [];
  const warnings = [];
  const payloads = [];

  for (const { line, record } of records) {
    const values = {};
    for (const [key, value] of Object.entries(record)) {
      const field = COLUMN_ALIASES[normalizeKey(key)];
      if (field) values[field] = value;
    }

    const name = values.name || "";
    if (!name) {
      errors.push({ line, message: "Missing name" });
      continue;
    }

    const data = { name };
    for (const field of TEXT_FIELDS) {
      if (values[field]) data[field] = values[field];
    }

    data.staffType = parseStaffType(values.staffType);
    data.status =
      String(values.status || "").trim().toLowerCase() === "inactive"
        ? "inactive"
        : "active";

    if (values.faculty) {
      const id = lookupName(facultyIndex, values.faculty);
      if (id) data.facultyId = id;
      else
        warnings.push({
          line,
          message: `Faculty "${values.faculty}" not found — left blank`,
        });
    }

    if (values.department) {
      const id = lookupName(departmentIndex, values.department);
      if (id) data.departmentId = id;
      else
        warnings.push({
          line,
          message: `Department "${values.department}" not found — left blank`,
        });
    }

    const base =
      slugify(values.slug || name, { lower: true, strict: true }) || "staff";
    data.slug = uniqueSlug(base, usedSlugs);
    usedSlugs.add(data.slug);

    payloads.push(data);
  }

  let created = 0;
  if (!dryRun && payloads.length > 0) {
    const result = await prisma.staff.createMany({ data: payloads });
    created = result.count;
  }

  res.json({
    dryRun,
    total: records.length,
    ready: payloads.length,
    created,
    skipped: errors.length,
    warnings,
    errors,
  });
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
  importMany: handle(importMany),
};

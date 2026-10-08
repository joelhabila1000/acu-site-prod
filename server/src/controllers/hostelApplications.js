const prisma = require("../lib/prisma");

function handle(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

const INCLUDE = { student: true, hostel: true, room: true, bed: true };

function enrich(a) {
  return {
    id: a.id,
    studentId: a.studentId,
    studentName: a.student ? a.student.name : "",
    matricNumber: a.student ? a.student.matricNumber : "",
    email: a.student ? a.student.email : "",
    phone: a.student ? a.student.phone : "",
    gender: a.student ? a.student.gender : "",
    session: a.session,
    status: a.status,
    hostelId: a.hostelId,
    hostelName: a.hostel ? a.hostel.name : "",
    roomId: a.roomId,
    roomName: a.room ? a.room.name : "",
    bedId: a.bedId,
    bedLabel: a.bed ? a.bed.label : "",
    preferredGender: a.preferredGender,
    notes: a.notes,
    adminNote: a.adminNote,
    checkedInAt: a.checkedInAt,
    checkedOutAt: a.checkedOutAt,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  };
}

async function list(req, res) {
  const { status, q } = req.query;
  const where = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { student: { name: { contains: q } } },
      { student: { matricNumber: { contains: q } } },
      { session: { contains: q } },
    ];
  }
  const rows = await prisma.hostelApplication.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: INCLUDE,
  });
  const data = rows.map(enrich);
  res.json({ data, total: data.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const row = await prisma.hostelApplication.findUnique({
    where: { id },
    include: INCLUDE,
  });
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(enrich(row));
}

// A student may hold only one application per session.
async function createMine(req, res) {
  const body = req.body || {};
  const session = String(body.session || "").trim();
  if (!session) return res.status(400).json({ error: "Session is required" });

  const existing = await prisma.hostelApplication.findFirst({
    where: { studentId: req.student.id, session },
  });
  if (existing)
    return res
      .status(400)
      .json({ error: "You already have an application for this session" });

  let hostelId = body.hostelId ? Number(body.hostelId) : null;
  if (hostelId) {
    const hostel = await prisma.hostel.findUnique({ where: { id: hostelId } });
    if (!hostel)
      return res.status(400).json({ error: "Selected hostel was not found" });
    if (hostel.gender !== "mixed" && req.student.gender && hostel.gender !== req.student.gender)
      return res
        .status(400)
        .json({ error: "That hostel is not open to your gender" });
  }

  const created = await prisma.hostelApplication.create({
    data: {
      studentId: req.student.id,
      hostelId,
      session,
      preferredGender: body.preferredGender
        ? String(body.preferredGender)
        : req.student.gender || null,
      notes: body.notes ? String(body.notes) : null,
      status: "pending",
    },
    include: INCLUDE,
  });
  res.status(201).json(enrich(created));
}

async function listMine(req, res) {
  const rows = await prisma.hostelApplication.findMany({
    where: { studentId: req.student.id },
    orderBy: { createdAt: "desc" },
    include: INCLUDE,
  });
  res.json({ data: rows.map(enrich) });
}

const EDITABLE = [
  "status",
  "hostelId",
  "roomId",
  "bedId",
  "adminNote",
  "preferredGender",
  "session",
  "notes",
];

async function update(req, res) {
  const id = Number(req.params.id);
  const body = req.body || {};
  const current = await prisma.hostelApplication.findUnique({ where: { id } });
  if (!current) return res.status(404).json({ error: "Not found" });

  const data = {};
  for (const key of EDITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  for (const key of ["hostelId", "roomId", "bedId"]) {
    if (data[key] !== undefined) data[key] = data[key] ? Number(data[key]) : null;
  }
  if (body.checkedInAt !== undefined)
    data.checkedInAt = body.checkedInAt ? new Date(body.checkedInAt) : null;
  if (body.checkedOutAt !== undefined)
    data.checkedOutAt = body.checkedOutAt ? new Date(body.checkedOutAt) : null;

  const newBedId = data.bedId !== undefined ? data.bedId : current.bedId;
  const oldBedId = current.bedId;

  // Keep bed occupancy in step with the allocation.
  if (oldBedId && oldBedId !== newBedId) {
    await prisma.bed
      .update({ where: { id: oldBedId }, data: { status: "available" } })
      .catch(() => {});
  }
  if (newBedId && newBedId !== oldBedId) {
    await prisma.bed
      .update({ where: { id: newBedId }, data: { status: "occupied" } })
      .catch(() => {});
    if (!data.status) data.status = "allocated";
  }
  if (data.status === "rejected") {
    if (newBedId)
      await prisma.bed
        .update({ where: { id: newBedId }, data: { status: "available" } })
        .catch(() => {});
    data.bedId = null;
  }
  if (data.status === "checked_out" && newBedId) {
    await prisma.bed
      .update({ where: { id: newBedId }, data: { status: "available" } })
      .catch(() => {});
  }

  const updated = await prisma.hostelApplication.update({
    where: { id },
    data,
    include: INCLUDE,
  });
  res.json(enrich(updated));
}

async function remove(req, res) {
  const id = Number(req.params.id);
  const app = await prisma.hostelApplication.findUnique({ where: { id } });
  if (app && app.bedId) {
    await prisma.bed
      .update({ where: { id: app.bedId }, data: { status: "available" } })
      .catch(() => {});
  }
  await prisma.hostelApplication.delete({ where: { id } });
  res.json({ success: true });
}

module.exports = {
  list: handle(list),
  get: handle(get),
  createMine: handle(createMine),
  listMine: handle(listMine),
  update: handle(update),
  remove: handle(remove),
};

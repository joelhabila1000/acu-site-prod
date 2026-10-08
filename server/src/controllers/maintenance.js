const prisma = require("../lib/prisma");

function handle(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

const INCLUDE = { student: true, room: { include: { hostel: true } }, bed: true };

function enrich(m) {
  return {
    id: m.id,
    studentId: m.studentId,
    studentName: m.student ? m.student.name : "",
    matricNumber: m.student ? m.student.matricNumber : "",
    roomId: m.roomId,
    roomName: m.room ? m.room.name : "",
    hostelName: m.room && m.room.hostel ? m.room.hostel.name : "",
    bedId: m.bedId,
    bedLabel: m.bed ? m.bed.label : "",
    category: m.category,
    description: m.description,
    priority: m.priority,
    status: m.status,
    createdAt: m.createdAt,
    updatedAt: m.updatedAt,
  };
}

async function list(req, res) {
  const { status } = req.query;
  const where = status ? { status } : {};
  const rows = await prisma.maintenanceRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: INCLUDE,
  });
  res.json({ data: rows.map(enrich) });
}

async function createMine(req, res) {
  const body = req.body || {};
  const description = String(body.description || "").trim();
  if (!description)
    return res.status(400).json({ error: "Please describe the problem" });

  const created = await prisma.maintenanceRequest.create({
    data: {
      studentId: req.student.id,
      roomId: body.roomId ? Number(body.roomId) : null,
      bedId: body.bedId ? Number(body.bedId) : null,
      category: body.category ? String(body.category) : "general",
      description,
      priority: body.priority ? String(body.priority) : "normal",
      status: "open",
    },
    include: INCLUDE,
  });
  res.status(201).json(enrich(created));
}

async function listMine(req, res) {
  const rows = await prisma.maintenanceRequest.findMany({
    where: { studentId: req.student.id },
    orderBy: { createdAt: "desc" },
    include: INCLUDE,
  });
  res.json({ data: rows.map(enrich) });
}

async function update(req, res) {
  const id = Number(req.params.id);
  const body = req.body || {};
  const data = {};
  for (const key of ["category", "description", "priority", "status", "roomId", "bedId"]) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  for (const key of ["roomId", "bedId"]) {
    if (data[key] !== undefined) data[key] = data[key] ? Number(data[key]) : null;
  }
  const updated = await prisma.maintenanceRequest.update({
    where: { id },
    data,
    include: INCLUDE,
  });
  res.json(enrich(updated));
}

async function remove(req, res) {
  await prisma.maintenanceRequest.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ success: true });
}

module.exports = {
  list: handle(list),
  createMine: handle(createMine),
  listMine: handle(listMine),
  update: handle(update),
  remove: handle(remove),
};

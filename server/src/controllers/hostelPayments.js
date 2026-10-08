const prisma = require("../lib/prisma");

function handle(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

const INCLUDE = { student: true };

function enrich(p) {
  return {
    id: p.id,
    studentId: p.studentId,
    studentName: p.student ? p.student.name : "",
    matricNumber: p.student ? p.student.matricNumber : "",
    applicationId: p.applicationId,
    amount: p.amount,
    reference: p.reference,
    method: p.method,
    status: p.status,
    paidAt: p.paidAt,
    createdAt: p.createdAt,
  };
}

async function list(req, res) {
  const { status } = req.query;
  const where = status ? { status } : {};
  const rows = await prisma.hostelPayment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: INCLUDE,
  });
  res.json({ data: rows.map(enrich) });
}

async function createMine(req, res) {
  const body = req.body || {};
  const amount = Number(body.amount) || 0;
  if (amount <= 0)
    return res.status(400).json({ error: "A payment amount is required" });

  const created = await prisma.hostelPayment.create({
    data: {
      studentId: req.student.id,
      applicationId: body.applicationId ? Number(body.applicationId) : null,
      amount,
      reference: body.reference ? String(body.reference) : null,
      method: body.method ? String(body.method) : "transfer",
      status: "pending",
    },
    include: INCLUDE,
  });
  res.status(201).json(enrich(created));
}

async function listMine(req, res) {
  const rows = await prisma.hostelPayment.findMany({
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
  for (const key of ["amount", "reference", "method", "status", "applicationId"]) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if (data.amount !== undefined) data.amount = Number(data.amount) || 0;
  if (data.applicationId !== undefined)
    data.applicationId = data.applicationId ? Number(data.applicationId) : null;
  if (body.paidAt !== undefined)
    data.paidAt = body.paidAt ? new Date(body.paidAt) : null;
  if (data.status === "paid" && !data.paidAt) data.paidAt = new Date();

  const updated = await prisma.hostelPayment.update({
    where: { id },
    data,
    include: INCLUDE,
  });
  res.json(enrich(updated));
}

async function remove(req, res) {
  await prisma.hostelPayment.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
}

module.exports = {
  list: handle(list),
  createMine: handle(createMine),
  listMine: handle(listMine),
  update: handle(update),
  remove: handle(remove),
};

const prisma = require("../lib/prisma");
const slugify = require("slugify");

function handle(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

// ---------------------------------------------------------------- Hostels

const HOSTEL_FIELDS = [
  "name",
  "slug",
  "gender",
  "description",
  "image",
  "location",
  "status",
  "sortOrder",
];

function hostelData(body) {
  const data = {};
  for (const key of HOSTEL_FIELDS) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if (data.sortOrder !== undefined) data.sortOrder = Number(data.sortOrder) || 0;
  if (data.name && !data.slug)
    data.slug = slugify(data.name, { lower: true, strict: true });
  return data;
}

function withCounts(hostel) {
  const beds = hostel.rooms.flatMap((room) => room.beds);
  return {
    ...hostel,
    roomCount: hostel.rooms.length,
    bedCount: beds.length,
    availableBeds: beds.filter((bed) => bed.status === "available").length,
  };
}

async function listHostels(req, res) {
  const { status, gender } = req.query;
  const where = {};
  where.status = status || "active";
  if (gender) where.OR = [{ gender }, { gender: "mixed" }];

  const rows = await prisma.hostel.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    include: {
      rooms: { orderBy: { id: "asc" }, include: { beds: true } },
    },
  });
  const data = rows.map(withCounts);
  res.json({ data, total: data.length });
}

async function getHostel(req, res) {
  const id = Number(req.params.id);
  const hostel = await prisma.hostel.findUnique({
    where: { id },
    include: { rooms: { orderBy: { id: "asc" }, include: { beds: true } } },
  });
  if (!hostel) return res.status(404).json({ error: "Not found" });
  res.json(withCounts(hostel));
}

async function createHostel(req, res) {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "Hostel name is required" });
  const created = await prisma.hostel.create({ data: hostelData(req.body) });
  res.status(201).json(created);
}

async function updateHostel(req, res) {
  const id = Number(req.params.id);
  const updated = await prisma.hostel.update({
    where: { id },
    data: hostelData(req.body || {}),
  });
  res.json(updated);
}

async function removeHostel(req, res) {
  const id = Number(req.params.id);
  await prisma.hostelApplication.updateMany({
    where: { hostelId: id },
    data: { hostelId: null },
  });
  await prisma.hostel.delete({ where: { id } });
  res.json({ success: true });
}

// ------------------------------------------------------------------ Rooms

const ROOM_FIELDS = ["hostelId", "name", "capacity", "status"];

function roomData(body) {
  const data = {};
  for (const key of ROOM_FIELDS) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if (data.hostelId !== undefined) data.hostelId = Number(data.hostelId);
  if (data.capacity !== undefined) data.capacity = Number(data.capacity) || 0;
  return data;
}

async function listRooms(req, res) {
  const { hostelId } = req.query;
  const where = hostelId ? { hostelId: Number(hostelId) } : {};
  const rows = await prisma.room.findMany({
    where,
    orderBy: { id: "asc" },
    include: { hostel: true, beds: true },
  });
  const data = rows.map((room) => ({
    ...room,
    hostelName: room.hostel ? room.hostel.name : "",
    bedCount: room.beds.length,
    availableBeds: room.beds.filter((bed) => bed.status === "available").length,
  }));
  res.json({ data, total: data.length });
}

async function createRoom(req, res) {
  const { name, hostelId } = req.body || {};
  if (!name || !hostelId)
    return res.status(400).json({ error: "Room name and hostel are required" });
  const created = await prisma.room.create({ data: roomData(req.body) });
  res.status(201).json(created);
}

async function updateRoom(req, res) {
  const id = Number(req.params.id);
  const updated = await prisma.room.update({
    where: { id },
    data: roomData(req.body || {}),
  });
  res.json(updated);
}

async function removeRoom(req, res) {
  const id = Number(req.params.id);
  await prisma.hostelApplication.updateMany({
    where: { roomId: id },
    data: { roomId: null },
  });
  await prisma.room.delete({ where: { id } });
  res.json({ success: true });
}

// ------------------------------------------------------------------- Beds

const BED_FIELDS = ["roomId", "label", "status"];

async function listBeds(req, res) {
  const { roomId } = req.query;
  const where = roomId ? { roomId: Number(roomId) } : {};
  const rows = await prisma.bed.findMany({
    where,
    orderBy: { id: "asc" },
    include: { room: { include: { hostel: true } } },
  });
  const data = rows.map((bed) => ({
    ...bed,
    roomName: bed.room ? bed.room.name : "",
    hostelName: bed.room && bed.room.hostel ? bed.room.hostel.name : "",
  }));
  res.json({ data, total: data.length });
}

async function createBed(req, res) {
  const { roomId } = req.body || {};
  if (!roomId || !req.body.label)
    return res.status(400).json({ error: "Bed label and room are required" });
  const data = { roomId: Number(roomId), label: req.body.label };
  if (req.body.status) data.status = req.body.status;
  const created = await prisma.bed.create({ data });
  res.status(201).json(created);
}

async function updateBed(req, res) {
  const id = Number(req.params.id);
  const data = {};
  for (const key of BED_FIELDS) {
    if (req.body[key] !== undefined) data[key] = req.body[key];
  }
  if (data.roomId !== undefined) data.roomId = Number(data.roomId);
  const updated = await prisma.bed.update({ where: { id }, data });
  res.json(updated);
}

async function removeBed(req, res) {
  const id = Number(req.params.id);
  await prisma.hostelApplication.updateMany({
    where: { bedId: id },
    data: { bedId: null },
  });
  await prisma.bed.delete({ where: { id } });
  res.json({ success: true });
}

module.exports = {
  listHostels: handle(listHostels),
  getHostel: handle(getHostel),
  createHostel: handle(createHostel),
  updateHostel: handle(updateHostel),
  removeHostel: handle(removeHostel),
  listRooms: handle(listRooms),
  createRoom: handle(createRoom),
  updateRoom: handle(updateRoom),
  removeRoom: handle(removeRoom),
  listBeds: handle(listBeds),
  createBed: handle(createBed),
  updateBed: handle(updateBed),
  removeBed: handle(removeBed),
};

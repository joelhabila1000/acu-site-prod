const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugify = require("slugify");

const WRITABLE = [
  "slug",
  "name",
  "description",
  "coverImage",
  "sortOrder",
  "status",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if (data.sortOrder !== undefined) data.sortOrder = Number(data.sortOrder) || 0;
  return data;
}

function normalizeImages(images, userId) {
  if (!Array.isArray(images)) return [];
  return images
    .filter((image) => image && image.imageUrl)
    .map((image, index) => ({
      imageUrl: image.imageUrl,
      caption: image.caption || null,
      sortOrder: Number(image.sortOrder) || index,
      uploadedBy: image.uploadedBy ?? userId ?? null,
    }));
}

async function list(req, res) {
  const { q, status } = req.query;
  const where = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }
  const items = await prisma.galleryAlbum.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    include: { images: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] } },
  });
  res.json({ data: items, total: items.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).json({ error: "Not found" });
  const item = await prisma.galleryAlbum.findUnique({
    where: { id },
    include: { images: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] } },
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });
  const data = pick(req.body);
  if (!data.slug) data.slug = slugify(name, { lower: true, strict: true });
  const images = normalizeImages(req.body.images, req.user && req.user.userId);
  if (images.length) data.images = { create: images };
  const created = await prisma.galleryAlbum.create({
    data,
    include: { images: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] } },
  });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).json({ error: "Not found" });
  const body = pick(req.body);
  if (body.name && !body.slug) {
    body.slug = slugify(body.name, { lower: true, strict: true });
  }
  if (req.body.images !== undefined) {
    body.images = {
      deleteMany: {},
      create: normalizeImages(req.body.images, req.user && req.user.userId),
    };
  }
  const updated = await prisma.galleryAlbum.update({
    where: { id },
    data: body,
    include: { images: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] } },
  });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).json({ error: "Not found" });
  await prisma.galleryAlbum.delete({ where: { id } });
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

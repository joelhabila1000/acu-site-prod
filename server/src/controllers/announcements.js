const prisma = require("../lib/prisma");

const WRITABLE = [
  "title",
  "content",
  "priority",
  "status",
  "publishedAt",
  "expiresAt",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if ("priority" in data) data.priority = Number(data.priority) || 1;
  for (const key of ["publishedAt", "expiresAt"]) {
    if (data[key] === "" || data[key] === null) data[key] = null;
    else if (data[key] !== undefined) data[key] = new Date(data[key]);
  }
  return data;
}

// The public site only sees announcements that are published and not expired.
async function list(req, res) {
  const { q, status } = req.query;
  const where = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [{ title: { contains: q } }, { content: { contains: q } }];
  }
  const items = await prisma.announcement.findMany({
    where,
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }, { id: "desc" }],
  });

  const now = new Date();
  const visible =
    status === "published"
      ? items.filter((row) => !row.expiresAt || row.expiresAt > now)
      : items;

  res.json({ data: visible, total: visible.length });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.announcement.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "Title and content are required" });
  const data = pick(req.body);
  if (data.status === "published" && !data.publishedAt) {
    data.publishedAt = new Date();
  }
  const created = await prisma.announcement.create({
    data: { ...data, createdBy: req.user && req.user.userId },
  });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const data = pick(req.body);
  if (data.status === "published" && !data.publishedAt) {
    data.publishedAt = new Date();
  }
  const updated = await prisma.announcement.update({ where: { id }, data });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.announcement.delete({ where: { id } });
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

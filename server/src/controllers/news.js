const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugify = require("slugify");

async function list(req, res) {
  const { q, status, limit, page = 1, per = 20 } = req.query;
  const where = {};
  if (status) where.status = status;
  if (q)
    where.OR = [
      { title: { contains: q } },
      { excerpt: { contains: q } },
      { content: { contains: q } },
    ];
  const take = limit ? Number(limit) : Number(per);
  const skip = limit ? 0 : (Number(page) - 1) * take;
  const [items, total] = await Promise.all([
    prisma.news.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take,
      skip,
    }),
    prisma.news.count({ where }),
  ]);
  res.json({ data: items, total });
}

async function get(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "Title and content required" });

  // Use the same writable list as update(), otherwise fields such as the cover
  // image and the extra photos are silently dropped when creating.
  const data = pick(req.body);

  if (!data.slug) {
    const slug = slugify(title, { lower: true, strict: true });
    const existing = await prisma.news.findUnique({ where: { slug } });
    data.slug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;
  }

  if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
  data.featured = !!data.featured;
  data.status = data.status || "draft";
  if (data.status === "published" && !data.publishedAt) {
    data.publishedAt = new Date();
  }
  data.authorId = req.user.userId;

  const created = await prisma.news.create({ data });
  res.json(created);
}

const WRITABLE = [
  "title",
  "slug",
  "excerpt",
  "content",
  "featuredImage",
  "images",
  "category",
  "featured",
  "status",
  "publishedAt",
];

function pick(body) {
  const data = {};
  for (const key of WRITABLE) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  return data;
}

async function update(req, res) {
  const id = Number(req.params.id);
  const body = pick(req.body);
  if (!body.slug && body.title) {
    body.slug = slugify(body.title, { lower: true, strict: true });
  }
  if (body.publishedAt) body.publishedAt = new Date(body.publishedAt);
  if (body.status === "published" && !body.publishedAt)
    body.publishedAt = new Date();
  const updated = await prisma.news.update({ where: { id }, data: body });
  res.json(updated);
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await prisma.news.delete({ where: { id } });
  res.json({ success: true });
}

module.exports = { list, get, create, update, remove };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugify = require("slugify");

async function list(req, res) {
  const { q, status, page = 1, per = 20 } = req.query;
  const where = {};
  if (status) where.status = status;
  if (q)
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { excerpt: { contains: q, mode: "insensitive" } },
      { content: { contains: q, mode: "insensitive" } },
    ];
  const take = Number(per);
  const skip = (Number(page) - 1) * take;
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
  const { title, excerpt, content, category, featured, status } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "Title and content required" });
  const slug = slugify(title, { lower: true, strict: true });
  const existing = await prisma.news.findUnique({ where: { slug } });
  let finalSlug = slug;
  if (existing) finalSlug = `${slug}-${Date.now().toString().slice(-4)}`;
  const data = {
    title,
    slug: finalSlug,
    excerpt,
    content,
    category,
    featured: !!featured,
    status: status || "draft",
    authorId: req.user.userId,
    publishedAt: status === "published" ? new Date() : null,
  };
  const created = await prisma.news.create({ data });
  res.json(created);
}

async function update(req, res) {
  const id = Number(req.params.id);
  const body = req.body;
  if (body.title) {
    body.slug = slugify(body.title, { lower: true, strict: true });
  }
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

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ALLOWED = [
  "site",
  "contact",
  "nav",
  "portals",
  "stats",
  "pillars",
  "programmes",
  "homepage",
];

async function getAll(req, res) {
  const rows = await prisma.siteSetting.findMany();
  const out = {};
  for (const row of rows) out[row.key] = row.value;
  res.json(out);
}

async function put(req, res) {
  const key = req.params.key;
  if (!ALLOWED.includes(key))
    return res.status(400).json({ error: "Unknown setting key" });
  const value = req.body;
  if (value === undefined || value === null)
    return res.status(400).json({ error: "Value required" });
  const row = await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  res.json({ key: row.key, value: row.value });
}

module.exports = { getAll, put };

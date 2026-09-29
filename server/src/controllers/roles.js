const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Read-only list. Roles are seeded and referenced by name in the auth layer,
// so the admin picks from them rather than creating new ones.
async function list(req, res) {
  const roles = await prisma.role.findMany({
    orderBy: { id: "asc" },
    include: { _count: { select: { users: true } } },
  });
  res.json({
    data: roles.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description || "",
      userCount: role._count.users,
    })),
    total: roles.length,
  });
}

function handle(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = { list: handle(list) };

const { PrismaClient } = require("@prisma/client");

// A single Prisma client for the whole process. Every `new PrismaClient()` opens
// its own connection pool, and on serverless platforms (Vercel) each warm
// function instance would otherwise create one pool per controller — quickly
// exhausting the database's connection limit. Cache it on globalThis so dev
// hot-reloads reuse the same client instead of leaking new ones.
const globalForPrisma = globalThis;

const prisma = globalForPrisma.__acuPrisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__acuPrisma = prisma;
}

module.exports = prisma;

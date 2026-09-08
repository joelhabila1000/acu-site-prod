const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.AUTH_SECRET || "dev-secret";

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ userId: user.id, roleId: user.roleId }, SECRET, {
    expiresIn: "8h",
  });
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}

function requireAuth(req, res, next) {
  const a = req.headers.authorization || "";
  const token = a.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { login, requireAuth };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const SECRET = process.env.AUTH_SECRET || "dev-secret";

// Roles that may manage content, and the one that may also manage users and
// site settings. Roles live in the database, so register any new privileged
// role name here — anything not listed gets no access at all.
const EDITOR_ROLES = [
  "Super Admin",
  "Content Editor",
  "Academic Editor",
  "Admissions Editor",
];
const ADMIN_ROLES = ["Super Admin"];

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  // Checked only after the password, so a disabled account cannot be told
  // apart from a wrong password by someone probing.
  if (user.status !== "active")
    return res.status(403).json({ error: "This account has been disabled" });

  const token = jwt.sign({ userId: user.id, roleId: user.roleId }, SECRET, {
    expiresIn: "8h",
  });
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role ? { id: user.role.id, name: user.role.name } : null,
    },
  });
}

// Verifies the token *and* loads the current user record, so a changed role or
// a disabled account takes effect immediately rather than when the token
// expires.
async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  let payload;
  try {
    payload = jwt.verify(token, SECRET);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { role: true },
    });
    if (!user) return res.status(401).json({ error: "Invalid token" });
    if (user.status !== "active")
      return res.status(403).json({ error: "This account has been disabled" });

    req.user = {
      userId: user.id,
      roleId: user.roleId,
      roleName: user.role ? user.role.name : "",
      name: user.name,
      email: user.email,
    };
    return next();
  } catch (error) {
    return next(error);
  }
}

// Returns an ARRAY of middleware: authentication first, then the role check.
// Express accepts an array in a route, and bundling them means a route can
// never accidentally check a role without first authenticating.
function requireRole(allowed) {
  function checkRole(req, res, next) {
    if (!allowed.includes(req.user.roleName)) {
      return res
        .status(403)
        .json({ error: "You do not have permission to do that" });
    }
    return next();
  }

  return [requireAuth, checkRole];
}

const requireEditor = requireRole(EDITOR_ROLES);
const requireAdmin = requireRole(ADMIN_ROLES);

// Only failed attempts are counted, so a correct password is never locked out.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many failed sign-in attempts. Try again later." },
});

module.exports = {
  login,
  requireAuth,
  requireEditor,
  requireAdmin,
  loginLimiter,
};

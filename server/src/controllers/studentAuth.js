const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const SECRET = require("../lib/authSecret");

// Only failed attempts count, so a correct password never locks the account out.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts. Please try again later." },
});

function publicStudent(s) {
  return {
    id: s.id,
    name: s.name,
    matricNumber: s.matricNumber,
    email: s.email,
    phone: s.phone,
    gender: s.gender,
    level: s.level,
    department: s.department,
  };
}

function stringOrNull(value) {
  const text = value === undefined || value === null ? "" : String(value).trim();
  return text || null;
}

async function register(req, res) {
  const body = req.body || {};
  const name = String(body.name || "").trim();
  const matricNumber = String(body.matricNumber || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!name || !matricNumber || !email || !password)
    return res
      .status(400)
      .json({ error: "Name, matric number, email and password are required" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });

  const existing = await prisma.studentAccount.findFirst({
    where: { OR: [{ email }, { matricNumber }] },
  });
  if (existing)
    return res.status(400).json({
      error: "An account with that email or matric number already exists",
    });

  const student = await prisma.studentAccount.create({
    data: {
      name,
      matricNumber,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      phone: stringOrNull(body.phone),
      gender: stringOrNull(body.gender),
      level: stringOrNull(body.level),
      department: stringOrNull(body.department),
    },
  });

  const token = jwt.sign({ studentId: student.id }, SECRET, {
    expiresIn: "7d",
  });
  res.status(201).json({ token, student: publicStudent(student) });
}

async function login(req, res) {
  const body = req.body || {};
  const identifier = String(body.email || body.matricNumber || "").trim();
  const password = String(body.password || "");
  if (!identifier || !password)
    return res
      .status(400)
      .json({ error: "Email or matric number and password are required" });

  const student = await prisma.studentAccount.findFirst({
    where: { OR: [{ email: identifier.toLowerCase() }, { matricNumber: identifier }] },
  });
  if (!student) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, student.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  if (student.status !== "active")
    return res.status(403).json({ error: "This account has been disabled" });

  await prisma.studentAccount.update({
    where: { id: student.id },
    data: { lastLogin: new Date() },
  });
  const token = jwt.sign({ studentId: student.id }, SECRET, {
    expiresIn: "7d",
  });
  res.json({ token, student: publicStudent(student) });
}

function me(req, res) {
  res.json({ student: req.student });
}

// Verifies the token *and* reloads the account, so a disabled student loses
// access immediately rather than when the token expires.
async function requireStudent(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  let payload;
  try {
    payload = jwt.verify(token, SECRET);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
  if (!payload.studentId)
    return res.status(401).json({ error: "Invalid token" });

  try {
    const student = await prisma.studentAccount.findUnique({
      where: { id: payload.studentId },
    });
    if (!student) return res.status(401).json({ error: "Invalid token" });
    if (student.status !== "active")
      return res.status(403).json({ error: "This account has been disabled" });
    req.student = publicStudent(student);
    return next();
  } catch (error) {
    return next(error);
  }
}

function handle(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = {
  register: handle(register),
  login: handle(login),
  me: handle(me),
  requireStudent,
  loginLimiter,
};

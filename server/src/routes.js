const express = require("express");
const router = express.Router();
const auth = require("./controllers/auth");
const news = require("./controllers/news");
const events = require("./controllers/events");
const principalOfficers = require("./controllers/principalOfficers");
const faculties = require("./controllers/faculties");
const gallery = require("./controllers/gallery");
const settings = require("./controllers/settings");
const uploads = require("./controllers/uploads");
const documents = require("./controllers/documents");
const staff = require("./controllers/staff");
const departments = require("./controllers/departments");
const users = require("./controllers/users");
const roles = require("./controllers/roles");
const announcements = require("./controllers/announcements");
const lectures = require("./controllers/lectures");
const messages = require("./controllers/messages");
const programmes = require("./controllers/programmes");
const publications = require("./controllers/publications");
const studentAuth = require("./controllers/studentAuth");
const hostel = require("./controllers/hostel");
const hostelApplications = require("./controllers/hostelApplications");
const hostelPayments = require("./controllers/hostelPayments");
const maintenance = require("./controllers/maintenance");

// Auth
router.post("/auth/login", auth.loginLimiter, auth.login);

// News
router.get("/news", news.list);
router.get("/news/:id", news.get);
router.post("/news", auth.requireEditor, news.create);
router.put("/news/:id", auth.requireEditor, news.update);
router.delete("/news/:id", auth.requireEditor, news.remove);

// Events
router.get("/events", events.list);
router.get("/events/:id", events.get);
router.post("/events", auth.requireEditor, events.create);
router.put("/events/:id", auth.requireEditor, events.update);
router.delete("/events/:id", auth.requireEditor, events.remove);

// Principal Officers
router.get("/principal-officers", principalOfficers.list);
router.get("/principal-officers/:id", principalOfficers.get);
router.post("/principal-officers", auth.requireEditor, principalOfficers.create);
router.put("/principal-officers/:id", auth.requireEditor, principalOfficers.update);
router.delete("/principal-officers/:id", auth.requireEditor, principalOfficers.remove);

// Faculties
router.get("/faculties", faculties.list);
router.get("/faculties/:id", faculties.get);
router.post("/faculties", auth.requireEditor, faculties.create);
router.put("/faculties/:id", auth.requireEditor, faculties.update);
router.delete("/faculties/:id", auth.requireEditor, faculties.remove);

// Gallery
router.get("/gallery", gallery.list);
router.get("/gallery/:id", gallery.get);
router.post("/gallery", auth.requireEditor, gallery.create);
router.put("/gallery/:id", auth.requireEditor, gallery.update);
router.delete("/gallery/:id", auth.requireEditor, gallery.remove);

// Site settings
router.get("/settings", settings.getAll);
router.put("/settings/:key", auth.requireEditor, settings.put);

// Staff directory
router.get("/staff", staff.list);
router.get("/staff/:id", staff.get);
router.post("/staff", auth.requireEditor, staff.create);
router.put("/staff/:id", auth.requireEditor, staff.update);
router.delete("/staff/:id", auth.requireEditor, staff.remove);

// Departments
router.get("/departments", departments.list);
router.get("/departments/:id", departments.get);
router.post("/departments", auth.requireEditor, departments.create);
router.put("/departments/:id", auth.requireEditor, departments.update);
router.delete("/departments/:id", auth.requireEditor, departments.remove);

// Documents (reports & downloads)
router.get("/documents", documents.list);
router.get("/documents/:id", documents.get);
router.post("/documents", auth.requireEditor, documents.create);
router.put("/documents/:id", auth.requireEditor, documents.update);
router.delete("/documents/:id", auth.requireEditor, documents.remove);

// Inaugural lectures
router.get("/lectures", lectures.list);
router.get("/lectures/:id", lectures.get);
router.post("/lectures", auth.requireEditor, lectures.create);
router.put("/lectures/:id", auth.requireEditor, lectures.update);
router.delete("/lectures/:id", auth.requireEditor, lectures.remove);

// Announcements
router.get("/announcements", announcements.list);
router.get("/announcements/:id", announcements.get);
router.post("/announcements", auth.requireEditor, announcements.create);
router.put("/announcements/:id", auth.requireEditor, announcements.update);
router.delete("/announcements/:id", auth.requireEditor, announcements.remove);

// Roles — read-only reference list for the Users form.
router.get("/roles", auth.requireAdmin, roles.list);

// Enquiries — the public contact and admissions forms post here; reading and
// triaging them is an editor task.
router.post("/messages", messages.submitLimiter, messages.create);
router.get("/messages", auth.requireEditor, messages.list);
router.get("/messages/:id", auth.requireEditor, messages.get);
router.put("/messages/:id", auth.requireEditor, messages.update);
router.delete("/messages/:id", auth.requireEditor, messages.remove);

// Postgraduate programme catalogue (Public site → Postgraduate page).
router.get("/programmes", programmes.list);
router.get("/programmes/:id", programmes.get);
router.post("/programmes", auth.requireEditor, programmes.create);
router.put("/programmes/:id", auth.requireEditor, programmes.update);
router.delete("/programmes/:id", auth.requireEditor, programmes.remove);

// Research & publications
router.get("/publications", publications.list);
router.get("/publications/:id", publications.get);
router.post("/publications", auth.requireEditor, publications.create);
router.put("/publications/:id", auth.requireEditor, publications.update);
router.delete("/publications/:id", auth.requireEditor, publications.remove);

// Uploads
router.post("/uploads", auth.requireEditor, uploads.parseUpload, uploads.put);
// Grants the browser a token to upload straight to Vercel Blob, sidestepping
// the serverless request-body limit. Falls back to /uploads when unavailable.
router.post("/uploads/client", auth.requireEditor, uploads.clientUploadToken);
router.post(
  "/uploads/document",
  auth.requireEditor,
  uploads.parseDocumentUpload,
  uploads.putDocument,
);

// Users — accounts and roles, so Super Admin only.
router.get("/users", auth.requireAdmin, users.list);
router.get("/users/:id", auth.requireAdmin, users.get);
router.post("/users", auth.requireAdmin, users.create);
router.put("/users/:id", auth.requireAdmin, users.update);
router.delete("/users/:id", auth.requireAdmin, users.remove);

// --------------------------------------------------------- Hostel portal
// Student accounts
router.post(
  "/hostel/auth/register",
  studentAuth.loginLimiter,
  studentAuth.register,
);
router.post("/hostel/auth/login", studentAuth.loginLimiter, studentAuth.login);
router.get("/hostel/auth/me", studentAuth.requireStudent, studentAuth.me);

// Public hostel catalogue
router.get("/hostels", hostel.listHostels);

// Student self-service
router.get(
  "/hostel/applications/mine",
  studentAuth.requireStudent,
  hostelApplications.listMine,
);
router.post(
  "/hostel/applications",
  studentAuth.requireStudent,
  hostelApplications.createMine,
);
router.get(
  "/hostel/payments/mine",
  studentAuth.requireStudent,
  hostelPayments.listMine,
);
router.post(
  "/hostel/payments",
  studentAuth.requireStudent,
  hostelPayments.createMine,
);
router.get(
  "/hostel/maintenance/mine",
  studentAuth.requireStudent,
  maintenance.listMine,
);
router.post(
  "/hostel/maintenance",
  studentAuth.requireStudent,
  maintenance.createMine,
);

// Staff — hostels, rooms and beds
router.get("/hostels/:id", auth.requireEditor, hostel.getHostel);
router.post("/hostels", auth.requireEditor, hostel.createHostel);
router.put("/hostels/:id", auth.requireEditor, hostel.updateHostel);
router.delete("/hostels/:id", auth.requireEditor, hostel.removeHostel);

router.get("/rooms", auth.requireEditor, hostel.listRooms);
router.post("/rooms", auth.requireEditor, hostel.createRoom);
router.put("/rooms/:id", auth.requireEditor, hostel.updateRoom);
router.delete("/rooms/:id", auth.requireEditor, hostel.removeRoom);

router.get("/beds", auth.requireEditor, hostel.listBeds);
router.post("/beds", auth.requireEditor, hostel.createBed);
router.put("/beds/:id", auth.requireEditor, hostel.updateBed);
router.delete("/beds/:id", auth.requireEditor, hostel.removeBed);

// Staff — applications, payments, maintenance
router.get("/hostel-applications", auth.requireEditor, hostelApplications.list);
router.get("/hostel-applications/:id", auth.requireEditor, hostelApplications.get);
router.put("/hostel-applications/:id", auth.requireEditor, hostelApplications.update);
router.delete(
  "/hostel-applications/:id",
  auth.requireEditor,
  hostelApplications.remove,
);

router.get("/hostel-payments", auth.requireEditor, hostelPayments.list);
router.put("/hostel-payments/:id", auth.requireEditor, hostelPayments.update);
router.delete("/hostel-payments/:id", auth.requireEditor, hostelPayments.remove);

router.get("/maintenance", auth.requireEditor, maintenance.list);
router.put("/maintenance/:id", auth.requireEditor, maintenance.update);
router.delete("/maintenance/:id", auth.requireEditor, maintenance.remove);

module.exports = router;

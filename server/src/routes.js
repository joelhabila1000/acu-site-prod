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
const users = require("./controllers/users");

// Auth
router.post("/auth/login", auth.login);

// News
router.get("/news", news.list);
router.get("/news/:id", news.get);
router.post("/news", auth.requireAuth, news.create);
router.put("/news/:id", auth.requireAuth, news.update);
router.delete("/news/:id", auth.requireAuth, news.remove);

// Events
router.get("/events", events.list);
router.get("/events/:id", events.get);
router.post("/events", auth.requireAuth, events.create);
router.put("/events/:id", auth.requireAuth, events.update);
router.delete("/events/:id", auth.requireAuth, events.remove);

// Principal Officers
router.get("/principal-officers", principalOfficers.list);
router.get("/principal-officers/:id", principalOfficers.get);
router.post("/principal-officers", auth.requireAuth, principalOfficers.create);
router.put("/principal-officers/:id", auth.requireAuth, principalOfficers.update);
router.delete("/principal-officers/:id", auth.requireAuth, principalOfficers.remove);

// Faculties
router.get("/faculties", faculties.list);
router.get("/faculties/:id", faculties.get);
router.post("/faculties", auth.requireAuth, faculties.create);
router.put("/faculties/:id", auth.requireAuth, faculties.update);
router.delete("/faculties/:id", auth.requireAuth, faculties.remove);

// Gallery
router.get("/gallery", gallery.list);
router.get("/gallery/:id", gallery.get);
router.post("/gallery", auth.requireAuth, gallery.create);
router.put("/gallery/:id", auth.requireAuth, gallery.update);
router.delete("/gallery/:id", auth.requireAuth, gallery.remove);

// Site settings
router.get("/settings", settings.getAll);
router.put("/settings/:key", auth.requireAuth, settings.put);

// Uploads
router.post("/uploads", auth.requireAuth, uploads.upload.single("file"), uploads.put);

// Users
router.get("/users", auth.requireAuth, users.list);
router.get("/users/:id", auth.requireAuth, users.get);
router.post("/users", auth.requireAuth, users.create);
router.put("/users/:id", auth.requireAuth, users.update);
router.delete("/users/:id", auth.requireAuth, users.remove);

module.exports = router;

const fs = require("fs");
const path = require("path");
const multer = require("multer");

const MAX_MB =
  Number(process.env.UPLOAD_MAX_MB) > 0 ? Number(process.env.UPLOAD_MAX_MB) : 4;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_MB * 1024 * 1024 },
});

// Overridable so a host with a persistent disk (not a serverless bundle) can
// point uploads somewhere that survives deployments.
const LOCAL_DIR =
  process.env.UPLOAD_DIR || path.join(__dirname, "..", "..", "..", "uploads");

function safeName(original) {
  return `${Date.now()}-${String(original).replace(/[^\w.-]+/g, "_")}`;
}

// Wraps multer so size/field errors return JSON instead of a generic 500.
function parseUpload(req, res, next) {
  upload.single("file")(req, res, (err) => {
    if (!err) return next();
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(413)
        .json({ error: `File is too large. Maximum size is ${MAX_MB} MB.` });
    }
    return res.status(400).json({ error: err.message || "Upload failed" });
  });
}

async function put(req, res) {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    try {
      const { put: blobPut } = require("@vercel/blob");
      const blob = await blobPut(
        `acu/${safeName(req.file.originalname)}`,
        req.file.buffer,
        { access: "public", token, contentType: req.file.mimetype },
      );
      return res.json({ url: blob.url });
    } catch (error) {
      return res
        .status(502)
        .json({ error: `Upload failed: ${error.message}` });
    }
  }

  try {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
    const name = safeName(req.file.originalname);
    fs.writeFileSync(path.join(LOCAL_DIR, name), req.file.buffer);
    res.json({ url: `/uploads/${name}` });
  } catch (error) {
    res.status(500).json({
      error:
        "Image storage is not configured on this host. Set BLOB_READ_WRITE_TOKEN or point UPLOAD_DIR at a persistent folder. (" +
        (error.code || error.message) +
        ")",
    });
  }
}

module.exports = { parseUpload, put };

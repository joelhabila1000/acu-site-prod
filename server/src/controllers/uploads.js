const fs = require("fs");
const path = require("path");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
});

const LOCAL_DIR = path.join(__dirname, "..", "..", "..", "uploads");

function safeName(original) {
  return `${Date.now()}-${String(original).replace(/[^\w.-]+/g, "_")}`;
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
        .status(500)
        .json({ error: `Upload failed: ${error.message}` });
    }
  }

  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  const name = safeName(req.file.originalname);
  fs.writeFileSync(path.join(LOCAL_DIR, name), req.file.buffer);
  res.json({ url: `/uploads/${name}` });
}

module.exports = { upload, put };

const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { handleUpload } = require("@vercel/blob/client");

const IMAGE_MAX_MB =
  Number(process.env.UPLOAD_MAX_MB) > 0 ? Number(process.env.UPLOAD_MAX_MB) : 10;

// Reports and other documents are allowed to be larger than images.
const DOCUMENT_MAX_MB =
  Number(process.env.UPLOAD_DOC_MAX_MB) > 0
    ? Number(process.env.UPLOAD_DOC_MAX_MB)
    : 20;

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: IMAGE_MAX_MB * 1024 * 1024 },
});

const documentUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: DOCUMENT_MAX_MB * 1024 * 1024 },
});

// Overridable so a host with a persistent disk (not a serverless bundle) can
// point uploads somewhere that survives deployments.
const LOCAL_DIR =
  process.env.UPLOAD_DIR || path.join(__dirname, "..", "..", "..", "uploads");

function safeName(original) {
  return `${Date.now()}-${String(original).replace(/[^\w.-]+/g, "_")}`;
}

// Wraps multer so size/field errors return JSON instead of a generic 500.
function parseWith(instance, maxMb) {
  return (req, res, next) => {
    instance.single("file")(req, res, (err) => {
      if (!err) return next();
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(413)
          .json({ error: `File is too large. Maximum size is ${maxMb} MB.` });
      }
      return res.status(400).json({ error: err.message || "Upload failed" });
    });
  };
}

const parseUpload = parseWith(imageUpload, IMAGE_MAX_MB);
const parseDocumentUpload = parseWith(documentUpload, DOCUMENT_MAX_MB);

// Direct (client-side) uploads. Serverless hosts — Vercel in particular — cap a
// request body at 4.5 MB, so a file sent through the API is rejected before it
// reaches us. Instead the browser asks this route for a short-lived token and
// then PUTs the file straight to Vercel Blob, bypassing the function entirely.
// The size limit is enforced by the token. Returns 501 when Blob is not
// configured so the client can fall back to the multipart routes above.
async function clientUploadToken(req, res) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return res
      .status(501)
      .json({ error: "Direct uploads are not configured on this host" });
  }

  try {
    const result = await handleUpload({
      token,
      request: req,
      body: req.body,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        let kind = "image";
        try {
          kind = JSON.parse(clientPayload || "{}").kind || "image";
        } catch {
          kind = "image";
        }
        const maxMb = kind === "document" ? DOCUMENT_MAX_MB : IMAGE_MAX_MB;
        return { maximumSizeInBytes: maxMb * 1024 * 1024, addRandomSuffix: true };
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message || "Upload failed" });
  }
}

// Writes the buffer to Vercel Blob when configured, otherwise to local disk,
// and returns the URL of the stored file. Local uploads come back as a path
// relative to the API (`/uploads/<name>`); the client rebases it against
// VITE_API_BASE, so it resolves through the same origin as the rest of the API
// — the dev proxy locally, the API host when the site is deployed apart —
// rather than a host baked in at upload time.
async function storeFile(file) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    const { put: blobPut } = require("@vercel/blob");
    const blob = await blobPut(
      `acu/${safeName(file.originalname)}`,
      file.buffer,
      { access: "public", token, contentType: file.mimetype },
    );
    return blob.url;
  }

  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  const name = safeName(file.originalname);
  fs.writeFileSync(path.join(LOCAL_DIR, name), file.buffer);
  return `/uploads/${name}`;
}

function storageError(error) {
  return (
    "File storage is not configured on this host. Set BLOB_READ_WRITE_TOKEN " +
    "or point UPLOAD_DIR at a persistent folder. (" +
    (error.code || error.message) +
    ")"
  );
}

async function put(req, res) {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  try {
    const url = await storeFile(req.file);
    res.json({ url });
  } catch (error) {
    res.status(500).json({ error: storageError(error) });
  }
}

// Same storage, but returns the metadata the Document model records so the
// admin can save the original filename, MIME type and byte size.
async function putDocument(req, res) {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  try {
    const url = await storeFile(req.file);
    res.json({
      url,
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } catch (error) {
    res.status(500).json({ error: storageError(error) });
  }
}

module.exports = {
  parseUpload,
  put,
  parseDocumentUpload,
  putDocument,
  clientUploadToken,
};

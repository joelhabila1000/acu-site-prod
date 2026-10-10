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

// Uploaded files are served back to browsers, so only content types that cannot
// execute script when opened are accepted. SVG and HTML are deliberately left
// out: both can carry script and would be served from the storage host.
const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
];

function typeFilter(allowed) {
  return (_req, file, cb) => {
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error(`Unsupported file type: ${file.mimetype || "unknown"}`));
  };
}

// multer's fileFilter only sees the client-declared MIME type, which is trivial
// to spoof. These signatures let us confirm the actual bytes match a type we
// accept, so a renamed script is rejected before it is ever stored.
const OLE = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
const ZIP = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
const SIGNATURES = {
  "image/jpeg": [Buffer.from([0xff, 0xd8, 0xff])],
  "image/png": [Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])],
  "image/gif": [Buffer.from("GIF87a"), Buffer.from("GIF89a")],
  "application/pdf": [Buffer.from("%PDF-")],
  "application/msword": [OLE],
  "application/vnd.ms-excel": [OLE],
  "application/vnd.ms-powerpoint": [OLE],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [ZIP],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [ZIP],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [ZIP],
};

function contentMatches(buffer, mimetype) {
  if (!buffer || buffer.length === 0) return false;

  const signatures = SIGNATURES[mimetype];
  if (signatures) {
    return signatures.some(
      (sig) =>
        buffer.length >= sig.length && buffer.subarray(0, sig.length).equals(sig),
    );
  }

  if (mimetype === "image/webp") {
    return (
      buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  if (mimetype === "image/avif") {
    return (
      buffer.length >= 12 &&
      buffer.subarray(4, 8).toString("ascii") === "ftyp" &&
      ["avif", "avis", "mif1", "msf1"].includes(
        buffer.subarray(8, 12).toString("ascii"),
      )
    );
  }

  // Plain text has no signature; a NUL byte in the header means the file is
  // binary (a renamed executable, say), not text.
  if (mimetype === "text/plain" || mimetype === "text/csv") {
    return !buffer.subarray(0, 1024).includes(0);
  }

  return false;
}

// The stored extension comes from the validated MIME type, never from the name
// the client sent — so a mislabelled upload can never land on disk as `.html`
// and be served as a web page by express.static.
const EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "text/plain": "txt",
  "text/csv": "csv",
};

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: IMAGE_MAX_MB * 1024 * 1024 },
  fileFilter: typeFilter(IMAGE_TYPES),
});

const documentUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: DOCUMENT_MAX_MB * 1024 * 1024 },
  fileFilter: typeFilter(DOCUMENT_TYPES),
});

// Overridable so a host with a persistent disk (not a serverless bundle) can
// point uploads somewhere that survives deployments.
const LOCAL_DIR =
  process.env.UPLOAD_DIR || path.join(__dirname, "..", "..", "..", "uploads");

function safeName(file) {
  const extension = EXTENSIONS[file.mimetype] || "bin";
  const base =
    String(file.originalname || "file")
      .replace(/\.[^./\\]*$/, "")
      .replace(/[^\w-]+/g, "_")
      .slice(0, 80) || "file";
  return `${Date.now()}-${base}.${extension}`;
}

// Wraps multer so size/field errors return JSON instead of a generic 500.
function parseWith(instance, maxMb) {
  return (req, res, next) => {
    instance.single("file")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(413)
            .json({ error: `File is too large. Maximum size is ${maxMb} MB.` });
        }
        return res.status(400).json({ error: err.message || "Upload failed" });
      }
      if (req.file && !contentMatches(req.file.buffer, req.file.mimetype)) {
        return res
          .status(400)
          .json({ error: "The file contents do not match its declared type." });
      }
      return next();
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
        const isDocument = kind === "document";
        const maxMb = isDocument ? DOCUMENT_MAX_MB : IMAGE_MAX_MB;
        return {
          allowedContentTypes: isDocument ? DOCUMENT_TYPES : IMAGE_TYPES,
          maximumSizeInBytes: maxMb * 1024 * 1024,
          addRandomSuffix: true,
        };
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
      `acu/${safeName(file)}`,
      file.buffer,
      { access: "public", token, contentType: file.mimetype },
    );
    return blob.url;
  }

  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  const name = safeName(file);
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

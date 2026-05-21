const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { createStoredFileName } = require("./fileNaming");

const uploadsDir = process.env.UPLOAD_DIR || "uploads";
const maxFileSize = Number(process.env.MAX_FILE_SIZE || 5242880);
const allowedMimeTypes = (process.env.ALLOWED_MIME_TYPES || "")
  .split(",")
  .map((type) => type.trim())
  .filter(Boolean);

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, createStoredFileName(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxFileSize,
  },
});

module.exports = {
  upload,
  uploadsDir,
  maxFileSize,
  allowedMimeTypes,
};

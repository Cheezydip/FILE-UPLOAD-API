const fs = require("fs/promises");
const path = require("path");
const File = require("../models/File");
const asyncHandler = require("../middleware/asyncHandler");
const { AppError } = require("../middleware/errorHandler");
const { uploadsDir } = require("../utils/multer");

const mapFileDocument = (fileDoc) => ({
  id: fileDoc._id,
  originalName: fileDoc.originalName,
  storedName: fileDoc.storedName,
  mimeType: fileDoc.mimeType,
  size: fileDoc.size,
  path: fileDoc.path,
  uploadedAt: fileDoc.uploadedAt,
  createdAt: fileDoc.createdAt,
  updatedAt: fileDoc.updatedAt,
});

const uploadFiles = asyncHandler(async (req, res) => {
  const uploadedFiles = req.files || (req.file ? [req.file] : []);

  if (!uploadedFiles.length) {
    throw new AppError("No files uploaded", 400);
  }

  const documents = await File.insertMany(
    uploadedFiles.map((file) => ({
      originalName: file.originalname,
      storedName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
    }))
  );

  res.status(201).json({
    status: "success",
    count: documents.length,
    data: documents.map(mapFileDocument),
  });
});

const listFiles = asyncHandler(async (req, res) => {
  const files = await File.find().sort({ createdAt: -1 });

  res.json({
    status: "success",
    count: files.length,
    data: files.map(mapFileDocument),
  });
});

const getFileById = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    throw new AppError("File not found", 404);
  }

  res.json({
    status: "success",
    data: mapFileDocument(file),
  });
});

const downloadFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    throw new AppError("File not found", 404);
  }

  const filePath = path.isAbsolute(file.path) ? file.path : path.join(uploadsDir, file.storedName);

  res.download(filePath, file.originalName);
});

const deleteFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    throw new AppError("File not found", 404);
  }

  await fs.unlink(file.path).catch((error) => {
    if (error.code !== "ENOENT") {
      throw error;
    }
  });

  await file.deleteOne();

  res.json({
    status: "success",
    message: "File deleted successfully",
  });
});

module.exports = {
  uploadFiles,
  listFiles,
  getFileById,
  downloadFile,
  deleteFile,
};

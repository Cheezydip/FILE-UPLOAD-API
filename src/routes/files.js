const express = require("express");
const {
  uploadFiles,
  listFiles,
  getFileById,
  downloadFile,
  deleteFile,
} = require("../controllers/filesController");
const { upload } = require("../utils/multer");

const router = express.Router();

router.post("/upload", upload.any(), uploadFiles);
router.get("/", listFiles);
router.get("/:id", getFileById);
router.get("/:id/download", downloadFile);
router.delete("/:id", deleteFile);

module.exports = router;

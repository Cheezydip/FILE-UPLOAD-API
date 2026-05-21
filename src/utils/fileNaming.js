const path = require("path");
const crypto = require("crypto");

const createStoredFileName = (originalName) => {
  const extension = path.extname(originalName || "");
  const uniqueId = `${Date.now()}-${crypto.randomUUID()}`;

  return `${uniqueId}${extension}`;
};

module.exports = {
  createStoredFileName,
};

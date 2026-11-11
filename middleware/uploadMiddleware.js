const multer = require("multer");
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// storage

const storage = new CloudinaryStorage ({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "raw";
    if (file.mimetype?.startsWith("image")) {
      resourceType = "image";
    }
    if (file.mimetype?.startsWith("video")) {
      resourceType = "video";
    }
    return {
      folder: "servicehub",
      resource_type: "auto",
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

module.exports = upload;

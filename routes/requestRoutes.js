const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");
const {
  createRequest,
  getMyRequests,
  getRequest,
  updateRequest,
  deleteRequest,
  updateStatus,
  getAllRequests,
} = require('../controllers/requestController');
// USER
router.post("/", protect, upload.array("attachments", 5), createRequest);

router.get("/my", protect, getMyRequests);
router.get("/:id", protect, getRequest);
 
router.delete("/:id", protect, deleteRequest);
// ADMIN
router.get("/", protect, isAdmin, getAllRequests);
router.put("/:id/status", protect, isAdmin, updateStatus);

module.exports = router;

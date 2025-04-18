const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/authMiddleware");
const {
  getUserNotifications,
  markAsRead,
} = require("../../controllers/user/notificationController");

router.get("/", verifyToken, getUserNotifications);
router.patch("/:id/read", verifyToken, markAsRead);

module.exports = router;

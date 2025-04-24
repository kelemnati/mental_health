const express = require("express");
const router = express.Router();

const {
  getRSVPedUsers,
  getBookmarkedUsers,
  getUsersFeedbacks,
} = require("../../controllers/admin/adminEventController");

const { verifyToken, isAdmin } = require("../../middlewares/authMiddleware");

router.get("/rsvped-users", verifyToken, isAdmin, getRSVPedUsers);
router.get("/bookmarked-users", verifyToken, isAdmin, getBookmarkedUsers);
router.get("/feedbacks", verifyToken, isAdmin, getUsersFeedbacks);

module.exports = router;

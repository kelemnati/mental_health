const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/authMiddleware");
const {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
} = require("../../controllers/user/bookmarkController");

router.post("/", verifyToken, addBookmark);
router.delete("/:eventId", verifyToken, removeBookmark);
router.get("/", verifyToken, getUserBookmarks);

module.exports = router;

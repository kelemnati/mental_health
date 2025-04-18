const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/authMiddleware");
const {
  submitFeedback,
  getEventFeedback,
} = require("../../controllers/user/feedbackController");

router.post("/:eventId", verifyToken, submitFeedback);
router.get("/:eventId", getEventFeedback);

module.exports = router;

const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middlewares/authMiddleware");
const {
  rsvpToEvent,
  searchEvents,
  getMyEvents,
} = require("../../controllers/user/userEventController");

router.post("/:eventId/rsvp", verifyToken, rsvpToEvent);
router.get("/search", verifyToken, searchEvents);
router.get("/my-events", verifyToken, getMyEvents);

module.exports = router;

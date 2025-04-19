const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middlewares/authMiddleware");
const {
  getAllEvents,
  rsvpToEvent,
  searchEvents,
  getMyEvents,
} = require("../../controllers/user/userEventController");

router.get("/all-events", verifyToken, getAllEvents);
router.get("/search", verifyToken, searchEvents);
router.get("/my-events", verifyToken, getMyEvents);
router.post("/:eventId/rsvp", verifyToken, rsvpToEvent);

module.exports = router;

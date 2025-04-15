// routes/admin/eventRoutes.js
const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("../../controllers/admin/eventController");

const { verifyToken, isAdmin } = require("../../middlewares/authMiddleware");

router.post("/", verifyToken, isAdmin, createEvent);
router.get("/", verifyToken, isAdmin, getAllEvents);
router.put("/:id", verifyToken, isAdmin, updateEvent);
router.delete("/:id", verifyToken, isAdmin, deleteEvent);

module.exports = router;

const Event = require("../../models/eventModel");

const createEvent = async (req, res) => {
  try {
    const event = new Event({ ...req.body, createdBy: req.user.id });
    await event.save();
    res.status(201).json({ message: "Event created", event });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error creating event" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const adminId = req.user.id;

    const events = await Event.find({ createdBy: adminId });

    res.status(200).json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching events." });
  }
};

const updateEvent = async (req, res) => {
  try {
    const adminId = req.user.id;
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 3. Check ownership
    if (event.createdBy.toString() !== adminId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this event" });
    }

    // 4. Update event
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });

    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Error updating event" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const adminId = req.user.id;
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== adminId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this event" });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Error deleting event" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};

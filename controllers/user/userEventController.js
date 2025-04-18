const Registration = require("../../models/registrationModel");
const Event = require("../../models/eventModel");

const generateAnonymousName = () => {
  return "user" + Math.floor(1000 + Math.random() * 9000);
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events." });
  }
};

const rsvpToEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { isAnonymous } = req.body;
    const userId = req.user?.id || req.user?._id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const confirmedCount = await Registration.countDocuments({
      event: eventId,
      status: "confirmed",
    });

    if (confirmedCount >= event.seatsAvailable) {
      return res.status(400).json({ message: "Event is fully booked." });
    }

    const userRSVP = await Registration.findOne({
      event: eventId,
      $or: [{ user: userId }, { isAnonymous: true, realUserId: userId }],
    });

    if (userRSVP) {
      return res.status(400).json({
        message: `You have already RSVPed for this event.`,
      });
    }

    const registrationData = {
      event: eventId,
      isAnonymous,
      status: "confirmed",
    };

    if (isAnonymous) {
      registrationData.anonymousName = generateAnonymousName();
      registrationData.realUserId = userId;
    } else {
      registrationData.user = userId;
    }

    const registration = await Registration.create(registrationData);

    return res.status(201).json({
      message: `RSVP successful${isAnonymous ? " (anonymous)" : ""}.`,
      registration,
      seatsLeft: event.seatsAvailable - (confirmedCount + 1),
    });
  } catch (error) {
    console.error("RSVP Error:", error);
    res.status(500).json({ message: "Server error while RSVPing." });
  }
};

const searchEvents = async (req, res) => {
  try {
    const { title, category, location, isVirtual, from, to } = req.query;

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (category) {
      query.categories = category;
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (isVirtual !== undefined) {
      query.isVirtual = isVirtual === "true";
    }

    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    const events = await Event.find(query).sort({ date: 1 });

    res.status(200).json({ events });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Failed to search events." });
  }
};

const getMyEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const registrations = await Registration.find({
      user: userId,
      status: "confirmed",
    }).populate("event");

    const upcoming = [];
    const past = [];

    registrations.forEach((reg) => {
      if (reg.event && reg.event.date) {
        const isUpcoming = new Date(reg.event.date) >= now;
        isUpcoming ? upcoming.push(reg.event) : past.push(reg.event);
      }
    });

    res.status(200).json({ upcoming, past });
  } catch (error) {
    console.error("Error fetching my events:", error);
    res.status(500).json({ message: "Failed to retrieve your events." });
  }
};

module.exports = {
  getAllEvents,
  rsvpToEvent,
  searchEvents,
  getMyEvents,
};

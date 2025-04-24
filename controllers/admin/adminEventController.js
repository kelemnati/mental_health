const Event = require("../../models/eventModel");
const Registration = require("../../models/registrationModel");
const User = require("../../models/userModel");
const Bookmark = require("../../models/bookmarkModel");

const getRSVPedUsers = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });

    const data = await Promise.all(
      events.map(async (event) => {
        const registrations = await Registration.find({
          event: event._id,
        }).populate("user", "username email");

        const rsvpedUsers = registrations.map((reg) => {
          if (reg.isAnonymous) {
            return {
              anonymousName: reg.anonymousName,
            };
          } else {
            return {
              username: reg.user.username,
              email: reg.user.email,
            };
          }
        });

        return {
          eventTitle: event.title,
          totalRSVPs: registrations.length,
          availableSeats: event.seatsAvailable,
          rsvpedUsers,
        };
      })
    );

    res.status(200).json({ events: data });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch RSVPed users",
      error: error.message,
    });
  }
};

const getBookmarkedUsers = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find()
      .populate("event")
      .populate("user", "username email");

    const filtered = bookmarks.filter(
      (b) => b.event.createdBy.toString() === req.user.id
    );

    const formatted = filtered.map((b) => ({
      eventTitle: b.event.title,
      user: {
        username: b.user.username,
        email: b.user.email,
      },
    }));

    res.status(200).json({
      totalBookmarks: formatted.length,
      bookmarks: formatted,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get bookmarks", error: error.message });
  }
};

const getUsersFeedbacks = async (req, res) => {
  try {
    const adminId = req.user._id;

    const adminEvents = await Event.find(
      { createdBy: adminId },
      "_id title date"
    );

    if (adminEvents.length === 0) {
      return res
        .status(404)
        .json({ message: "You have not created any events yet." });
    }

    const eventIds = adminEvents.map((event) => event._id);

    const feedbacks = await Feedback.find({ event: { $in: eventIds } })
      .populate("user", "username email")
      .populate("event", "title date")
      .sort({ createdAt: -1 });

    // Step 3: Format results
    const result = feedbacks.map((fb) => ({
      eventTitle: fb.event?.title,
      eventDate: fb.event?.date,
      user: fb.isAnonymous ? fb.anonymousName : fb.user?.username,
      comment: fb.comment,
      rating: fb.rating,
      submittedAt: fb.createdAt,
    }));

    res.status(200).json({ feedbacks: result });
  } catch (error) {
    console.error("Error getting admin feedbacks:", error);
    res.status(500).json({ message: "Server error while fetching feedbacks." });
  }
};

module.exports = {
  getRSVPedUsers,
  getBookmarkedUsers,
  getUsersFeedbacks,
};

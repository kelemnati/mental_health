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
        }).populate("user", "fullName email");

        const users = registrations.map((reg) =>
          reg.isAnonymous
            ? { anonymousName: reg.anonymousName }
            : {
                fullName: reg.user.fullName,
                email: reg.user.email,
              }
        );

        return {
          eventTitle: event.title,
          totalRSVPs: registrations.length,
          availableSeats: event.seatsAvailable,
          rsvpedUsers: users,
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
      .populate("user", "fullName email");

    const filtered = bookmarks.filter(
      (b) => b.event.createdBy.toString() === req.user.id
    );

    const formatted = filtered.map((b) => ({
      eventTitle: b.event.title,
      user: {
        fullName: b.user.fullName,
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
      .populate("user", "fullName email")
      .populate("event", "title date")
      .sort({ createdAt: -1 });

    // Step 3: Format results
    const result = feedbacks.map((fb) => ({
      eventTitle: fb.event?.title,
      eventDate: fb.event?.date,
      user: fb.isAnonymous ? fb.anonymousName : fb.user?.fullName,
      email: fb.isAnonymous ? undefined : fb.user?.email,
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

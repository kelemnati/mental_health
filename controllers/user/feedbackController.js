const Feedback = require("../../models/feedbackModel");
const Registration = require("../../models/registrationModel");

const submitFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id || req.user._id;
    const { rating, comment } = req.body;

    const registration = await Registration.findOne({
      event: eventId,
      status: "confirmed",
      $or: [{ user: userId }, { realUserId: userId }],
    });

    if (!registration) {
      return res.status(403).json({
        message: "You must RSVP to this event before submitting feedback.",
      });
    }

    let existingFeedback;
    if (registration.isAnonymous) {
      existingFeedback = await Feedback.findOne({
        event: eventId,
        anonymousName: registration.anonymousName,
      });

      if (existingFeedback) {
        return res.status(400).json({
          message: "Feedback already submitted.",
        });
      }

      const feedback = await Feedback.create({
        event: eventId,
        anonymousName: registration.anonymousName,
        rating,
        comment,
      });

      return res.status(201).json({
        message: "Anonymous feedback submitted.",
        feedback,
      });
    } else {
      existingFeedback = await Feedback.findOne({
        event: eventId,
        user: userId,
      });

      if (existingFeedback) {
        return res.status(400).json({
          message: "Feedback already submitted.",
        });
      }

      const feedback = await Feedback.create({
        event: eventId,
        user: userId,
        rating,
        comment,
      });

      return res.status(201).json({
        message: "Feedback submitted.",
        feedback,
      });
    }
  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({
      message: "Server error while submitting feedback.",
    });
  }
};

const getEventFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const feedbacks = await Feedback.find({ event: eventId }).populate(
      "user",
      "fullName"
    );
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Get Feedback Error:", error);
    res.status(500).json({ message: "Server error while getting feedbacks." });
  }
};

module.exports = {
  submitFeedback,
  getEventFeedback,
};

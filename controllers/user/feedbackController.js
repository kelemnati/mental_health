const Feedback = require("../../models/feedbackModel");
const Registration = require("../../models/registrationModel");

const getUserRegistration = async (eventId, userId) => {
  return await Registration.findOne({
    event: eventId,
    status: "confirmed",
    $or: [{ user: userId }, { realUserId: userId }],
  });
};

const submitFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id || req.user._id;
    const { rating, comment } = req.body;

    const registration = await getUserRegistration(eventId, userId);

    if (!registration) {
      return res.status(403).json({
        message: "You must RSVP to this event before submitting feedback.",
      });
    }

    let existingFeedback;
    let feedbackData = {
      event: eventId,
      rating,
      comment,
    };

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

      feedbackData.anonymousName = registration.anonymousName;
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

      feedbackData.user = userId;
    }

    const feedback = await Feedback.create(feedbackData);

    res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback,
    });
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
      "username"
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

const Feedback = require("../../models/feedbackModel");
const Registration = require("../../models/registrationModel");

const submitFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;
    const { rating, comment } = req.body;

    const registered = await Registration.findOne({
      user: userId,
      event: eventId,
      status: "confirmed",
    });

    if (!registered) {
      return res
        .status(403)
        .json({ message: "You must RSVP to leave feedback." });
    }

    const existing = await Feedback.findOne({ user: userId, event: eventId });
    if (existing) {
      return res.status(400).json({ message: "Feedback already submitted." });
    }

    const feedback = await Feedback.create({
      user: userId,
      event: eventId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (error) {
    console.error("Feedback Error:", error);
    res
      .status(500)
      .json({ message: "Server error while submitting feedback." });
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

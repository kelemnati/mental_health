const Notification = require("../../models/notificationModel");

// Get all notifications for the logged-in user
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("event", "title date");

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Notification fetch error:", error);
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.status(200).json({ message: "Notification marked as read." });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({ message: "Failed to mark as read." });
  }
};

module.exports = {
  getUserNotifications,
  markAsRead,
};

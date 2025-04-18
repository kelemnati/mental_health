const Bookmark = require("../../models/bookmarkModel");

const addBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.body;

    // Prevent duplicate bookmarks
    const existing = await Bookmark.findOne({ user: userId, event: eventId });
    if (existing) {
      return res.status(400).json({ message: "Event already bookmarked." });
    }

    const bookmark = await Bookmark.create({ user: userId, event: eventId });
    res.status(201).json({ message: "Bookmarked successfully", bookmark });
  } catch (error) {
    console.error("Add Bookmark Error:", error);
    res.status(500).json({ message: "Server error while adding bookmark." });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const removed = await Bookmark.findOneAndDelete({
      user: userId,
      event: eventId,
    });
    if (!removed) {
      return res.status(404).json({ message: "Bookmark not found." });
    }

    res.status(200).json({ message: "Bookmark removed." });
  } catch (error) {
    console.error("Remove Bookmark Error:", error);
    res.status(500).json({ message: "Server error while removing bookmark." });
  }
};

const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookmarks = await Bookmark.find({ user: userId }).populate("event");
    res.status(200).json({ bookmarks });
  } catch (error) {
    console.error("Get Bookmarks Error:", error);
    res.status(500).json({ message: "Server error while fetching bookmarks." });
  }
};

module.exports = {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
};

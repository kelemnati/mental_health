// models/bookmarkModel.js
const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Prevent duplicate bookmarks
bookmarkSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);

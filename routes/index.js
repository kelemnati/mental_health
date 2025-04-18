const express = require("express");
const router = express.Router();

// Admin routes
router.use("/admin/auth", require("./admin/adminAuthRoutes"));
router.use("/admin/events", require("./admin/eventRoutes"));

// User routes
router.use("/user/auth", require("./user/userAuthRoutes"));
router.use("/user/events", require("./user/userEventRoute"));
router.use("/user/bookmarks", require("./user/bookmarkRoutes"));
router.use("/user/feedbacks", require("./user/feedbackRoutes"));
router.use("/user/notifications", require("./user/notificationRoutes"));

module.exports = router;

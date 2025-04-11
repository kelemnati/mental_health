require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db_connect");
const adminAuthRoute = require("./routes/admin/adminAuthRoutes");
const userAuthRoutes = require("./routes/user/userAuthRoutes");
const adminEventRoutes = require("./routes/admin/eventRoutes");

dbConnect();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/v1/admin/auth", adminAuthRoute);
app.use("/api/v1/user/auth", userAuthRoutes);
app.use("/api/v1/admin/events", adminEventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

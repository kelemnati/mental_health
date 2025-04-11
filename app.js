require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db_connect");
const adminAuthRoute = require("./routes/admin/adminAuthRoutes");

dbConnect();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/v1/admin/auth", adminAuthRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

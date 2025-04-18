require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db_connect");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB
dbConnect();

// Middlewares
app.use(cors());
app.use(express.json());

// Route imports
const routes = require("./routes");

// Mount routes
app.use("/api/v1", routes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

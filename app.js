require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db_connect");

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();

app.use(cors());
app.use(express.json());

const routes = require("./routes");

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

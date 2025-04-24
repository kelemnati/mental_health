require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db_connect");

const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/appError");

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes");

dbConnect();

app.use(cors());
app.use(express.json());

//API routes
app.use("/api/v1", routes);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

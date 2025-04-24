const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/appError");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", require("./routes"));

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(errorHandler);

module.exports = app;

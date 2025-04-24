require("dotenv").config();
const app = require("./app");
const dbConnect = require("./config/db_connect");

const PORT = process.env.PORT || 3000;

dbConnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

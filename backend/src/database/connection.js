const mongoose = require("mongoose");
const dotenv = require("../config");

const URI = dotenv.mongoUri;

exports.connection = mongoose
  .connect(URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database err:", err);
  });

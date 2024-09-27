const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    success: {
      type: Boolean,
      required: true,
    },
    user: {
      type: String,
      required: false,
    },
    client: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("report", reportSchema);

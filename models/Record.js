const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    duration: String,
    blood: String,
    urgent: String,
    pain: String,
    type: String,
    size: String,
    color: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = model("Record", recordSchema);

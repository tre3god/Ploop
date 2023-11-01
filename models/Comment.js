const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    advisorName: {
      type: String,
      ref: "User",
      required: true,
    },
    stoolRecordId: {
      type: Schema.Types.ObjectId,
      ref: "Record",
      required: true,
    },
    comment: String,
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);

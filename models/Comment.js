const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    stoolRecordId: {
      type: Schema.Types.ObjectId,
      ref: "Record",
      required: true,
    },
    duration: String,
    comment: String,
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);

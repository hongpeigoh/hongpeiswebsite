const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const laneSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Lane", laneSchema);

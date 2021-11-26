const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  label: {
    type: Number,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  laneId: {
    type: Schema.Types.ObjectId,
    ref: "Lane",
    required: true,
  },
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

module.exports = mongoose.model("Card", cardSchema);

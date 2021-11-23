const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const laneSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  cards: [
    {
      cardId: { type: Schema.Types.ObjectId, ref: "Card" },
    },
  ],
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

module.exports = mongoose.model('Lane', laneSchema);
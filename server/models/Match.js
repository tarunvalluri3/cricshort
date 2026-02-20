const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  battingIndex: {
    type: Number,
    required: true,
  },
  runs: {
    type: Number,
    required: true,
  },
  notOut: {
    type: Boolean,
    default: false,
  },
});

const MatchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["test", "overs"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    players: [PlayerSchema],
    rankings: [PlayerSchema],
    totalRuns: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", MatchSchema);
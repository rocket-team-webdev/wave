const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const playbackSchema = new Schema(
  {
    ip: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => validator.isIP(value),
        message: () => `IP is not valid`,
      },
    },
    latitude: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => validator.isLatLong(value),
        message: () => `Latitude is not valid`,
      },
    },
    longitude: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => validator.isLatLong(value),
        message: () => `Longitude is not valid`,
      },
    },
    agent: {
      type: String,
      enum: ["MOBILE", "WEB", "OTHER"],
      required: [true, "Agent type is required"],
    },
    trackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "track",
      required: [true, "Track id is required"],
    },
  },

  {
    timestamps: true,
  },
);

const Playback = mongoose.model("playback", playbackSchema);

module.exports = Playback;

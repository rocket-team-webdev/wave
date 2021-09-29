const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const trackSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Track name is required"],
    },
    artist: {
      type: String,
      trim: true,
      required: [true, "Track artist is required"],
    },
    rating: {
      type: Number,
      default: 0.0,
    },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: () => `Track url is not valid`,
      },
      required: [true, "Track url is required"],
    },
    color: {
      type: String,
    },
    released: {
      type: Date,
    },
    duration: {
      type: Number,
      required: [true, "Track duration is required"],
    },
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "genre",
      required: [true, "Genre id is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "album",
      required: [true, "Album id is required"],
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },

  {
    timestamps: true,
  },
);

const Track = mongoose.model("track", trackSchema);

module.exports = Track;

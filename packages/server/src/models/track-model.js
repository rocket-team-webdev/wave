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
    popularity: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: () => `Track thumbnail is not valid`,
      },
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
    // albums: {
    //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: "album" }],
    //   required: [true, "Albums list is required"],
    // },
    albums: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "album",
      required: [true, "Album is required"],
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },

  {
    timestamps: true,
  },
);

const Track = mongoose.model("track", trackSchema);

module.exports = Track;

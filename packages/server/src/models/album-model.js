const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const albumSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title name is required"],
    },
    year: {
      type: Number,
    },
    thumbnail: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: () => `Album thumbnail is not valid`,
      },
    },
    totalTracks: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User id is required"],
    },
    likedBy: {
      type: [mongoose.Types.ObjectId],
    },
  },

  {
    timestamps: true,
  },
);

const Album = mongoose.model("playlist", albumSchema);

module.exports = Album;

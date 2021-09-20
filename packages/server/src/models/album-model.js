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
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },

  {
    timestamps: true,
  },
);

const Album = mongoose.model("album", albumSchema);

module.exports = Album;

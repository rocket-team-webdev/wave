const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Playlist name is required"],
    },
    collaborative: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      trim: true,
    },
    primaryColor: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: () => `Track thumbnail is not valid`,
      },
    },
    publicAccessible: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "track" }],
    followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const Playlist = mongoose.model("playlist", playlistSchema);

module.exports = Playlist;

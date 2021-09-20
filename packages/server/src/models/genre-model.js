const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const genreSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Genre name is required"],
    },
    popularity: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  },
);

const Genre = mongoose.model("genre", genreSchema);

module.exports = Genre;

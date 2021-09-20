const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
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
    released: {
      type: Date,
    },
    duration: {
      type: Number,
      required: [true, "Track duration is required"],
    },
    genreId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Genre id is required"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User id is required"],
    },
    albums: {
      type: [mongoose.Types.ObjectId],
      required: [true, "Albums list is required"],
    },
    likedBy: {
      type: [mongoose.Types.ObjectId],
    },
  },

  {
    timestamps: true,
  },
);

// Scheme hooks
userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000 && error.keyPattern.email)
    next(new Error("Email already exists!"));
  else next(error);
});

const Client = mongoose.model("client", userSchema);

module.exports = Client;

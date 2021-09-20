const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "User name is required"],
    },
    firebaseId: {
      type: String,
      trim: true,
      required: [true, "Firebase id is required"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    birthDate: {
      type: Date,
      required: [true, "Birth date is required"],
    },
    isArtist: {
      type: Boolean,
      default: false,
    },
    following: {
      type: [mongoose.Types.ObjectId],
    },
    followedBy: {
      type: [mongoose.Types.ObjectId],
    },
  },

  {
    strict: false,
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

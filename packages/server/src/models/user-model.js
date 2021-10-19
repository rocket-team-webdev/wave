const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "User name is required"],
    },
    lastName: {
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
    },
    country: {
      type: String,
      enum: [
        "Spain",
        "Argentina",
        "Morocco",
        "France",
        "Italy",
        "Germany",
        "USA",
        "Mexico",
        "Catalonia",
      ],
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    profilePicture: {
      type: String,
      trim: true,
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
  else if (error.code === 11000 && error.keyPattern.username)
    next(new Error("Username already exists!"));
  else next(error);
});

const User = mongoose.model("user", userSchema);

module.exports = User;

const fs = require("fs");
const path = require("path");
const db = require("../models");
const { cloudinary } = require("../services/cloudinary");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const { DEFAULT_PROFILE_PICTURE } = require("../utils/default-presets");

async function signUp(req, res, next) {
  const { firebaseId } = req.user;

  try {
    const data = await db.User.findOne({ firebaseId }, { _id: 1 });

    if (!data) {
      Object.keys(req.body).forEach(
        (k) => req.body[k] == "" && delete req.body[k],
      );

      let profilePicture = req.files?.profilePicture;
      let profilePictureUrl =
        req.body.profilePicture || DEFAULT_PROFILE_PICTURE;

      if (profilePicture) {
        profilePicture = profilePicture[0];
        const profilePictureLocation = path.join(
          __dirname,
          "../../",
          "uploads",
          profilePicture.originalname,
        );

        // upload file
        await writeFileAsync(
          profilePictureLocation,
          Buffer.from(new Uint8Array(profilePicture.buffer)),
        );

        // upload to cloudinary
        const cldProfilePictureRes = await cloudinary.uploader.upload(
          profilePictureLocation,
          {
            upload_preset: "profile-pictures-preset",
            resource_type: "image",
            width: 300,
            height: 300,
            crop: "limit",
          },
        );
        profilePictureUrl = cldProfilePictureRes.secure_url;

        // delete uploaded file
        fs.unlink(profilePictureLocation, (err) => {
          if (err) throw err;
        });
      }

      console.log("profilePictureUrl fuers", profilePictureUrl);

      const newUser = await db.User.create({
        ...req.user,
        ...req.body,
        profilePicture: profilePictureUrl,
      });

      return res
        .status(200)
        .send({ message: "Successfully signed up", userId: newUser._id });
    }

    res
      .status(200)
      .send({ message: "User already exists found", userId: data._id });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function signIn(req, res, next) {
  try {
    const { firebaseId } = req.user;

    const data = await db.User.findOne(
      { firebaseId },
      { firstName: 1, lastName: 1, profilePicture: 1, _id: 1 },
    );

    res.status(200).send({ message: "Successfully signed in", data: data });
  } catch (error) {
    res.status(401).send({ error: error.message });
    next(error);
  }
}

module.exports = {
  signUp: signUp,
  signIn: signIn,
};

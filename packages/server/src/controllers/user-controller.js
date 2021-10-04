const db = require("../models");

const { cloudinary } = require("../services/cloudinary");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

async function signUp(req, res, next) {
  const { firebaseId } = req.user;

  console.log("req", req);
  console.log("req.body", req.body);
  console.log("req.files", req.files);

  try {
    const data = await db.User.findOne({ firebaseId });

    if (!data) {
      Object.keys(req.body).forEach(
        (k) => req.body[k] == "" && delete req.body[k],
      );

      /********************************** */
      let profilePicture = req.files["profilePicture"];

      let profilePictureUrl =
        "https://res.cloudinary.com/dz5nspe7f/image/upload/v1633334998/default-preset/default-profile-picture_vbob5l.png";

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
            upload_preset: "covers-preset",
            resource_type: "image",
          },
        );
        profilePictureUrl = cldProfilePictureRes.secure_url;

        // delete uploaded file
        fs.unlink(profilePictureLocation, (err) => {
          if (err) throw err;
        });
      }
      /*********************************** */

      const newUser = await db.User.create({
        ...req.user,
        ...req.body,
        profilePicture: profilePictureUrl,
      });

      return res
        .status(200)
        .send({ message: "Successfully signed up", userId: newUser._id });
    }

    res.status(200).send({ message: "User found", userId: data._id });
  } catch (error) {
    res.status(500).send({ error: error });
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
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  signUp: signUp,
  signIn: signIn,
};

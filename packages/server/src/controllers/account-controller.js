const db = require("../models");

const { cloudinary } = require("../services/cloudinary");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const { getPublicId } = require("../utils/cloudinaryUtils");

const { DEFAULT_PROFILE_PICTURE } = require("../utils/default-presets");

async function getAccount(req, res, next) {
  try {
    const { email } = req.user;
    const user = await db.User.findOne({ email });

    res.status(200).send({
      data: user,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

async function updateAccount(req, res) {
  try {
    const { email } = req.user;

    const user = await db.User.findOne({ email: email });
    const { profilePicture } = user;
    console.log("Old url of user", profilePicture);
    let isProfilePictureDefault = false;

    // checking if old profile picture is the default one
    if (profilePicture === DEFAULT_PROFILE_PICTURE) {
      isProfilePictureDefault = true;
      console.log("Is the img default");
    }

    /********************************** */
    let profilePictureFile = req.files["profilePicture"];
    console.log(profilePictureFile);

    let profilePictureUrl = DEFAULT_PROFILE_PICTURE;

    if (profilePictureFile) {
      profilePictureFile = profilePictureFile[0];
      const profilePictureLocation = path.join(
        __dirname,
        "../../",
        "uploads",
        profilePictureFile.originalname,
      );

      // upload file
      await writeFileAsync(
        profilePictureLocation,
        Buffer.from(new Uint8Array(profilePictureFile.buffer)),
      );

      // upload to cloudinary
      const cldProfilePictureRes = await cloudinary.uploader.upload(
        profilePictureLocation,
        {
          upload_preset: "profile-pictures-preset",
          resource_type: "image",
        },
      );
      profilePictureUrl = cldProfilePictureRes.secure_url;
      console.log("New cloudinary img url", profilePictureUrl);

      // delete old picture on cloudinary
      if (!isProfilePictureDefault) {
        const publicId = getPublicId(profilePicture);
        console.log("public Id de archivo a eliminar", publicId);
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      }

      // delete uploaded file
      fs.unlink(profilePictureLocation, (err) => {
        if (err) throw err;
      });
    }
    /*********************************** */

    const updatedAccount = await db.User.findOneAndUpdate(
      { email },
      { ...req.body, profilePicture: profilePictureUrl },
      {
        new: true,
      },
    );

    res.status(200).send({
      id: updatedAccount._id,
      data: updatedAccount,
      message: "Success",
    });
  } catch (error) {
    res.status(404).send({
      error: error,
    });
  }
}

async function deleteAccount(req, res, next) {
  try {
    const { email } = req.user;
    const deletedAccount = await db.User.findOneAndDelete({ email });

    if (!deletedAccount) res.status(404).send({ message: "User not found!" });

    res.status(200).send({
      data: deletedAccount,
      message: "Success",
    });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  deleteAccount: deleteAccount,
  getAccount: getAccount,
  updateAccount: updateAccount,
};

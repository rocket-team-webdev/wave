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
    const user = await db.User.findOne(
      { email },
      { email: 1, firstName: 1, lastName: 1, birthDate: 1, country: 1, _id: 0 },
    );

    res.status(200).send({
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function updateAccount(req, res, next) {
  try {
    const { firebaseId } = req.user;
    const { firstName, lastName, birthDate, country, email } = req.body;
    const { profilePicture } = await db.User.findOne(
      {
        firebaseId: firebaseId,
      },
      { profilePicture: 1, _id: 0 },
    );
    let profilePictureFile = req.files["profilePicture"];
    let isProfilePictureDefault = false;
    let profilePictureUrl = profilePicture;

    if (profilePictureFile) {
      // checking if old profile picture is the default one
      if (profilePicture === DEFAULT_PROFILE_PICTURE)
        isProfilePictureDefault = true;

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
          width: 300,
          height: 300,
          crop: "limit",
        },
      );
      profilePictureUrl = cldProfilePictureRes.secure_url;

      // delete old picture on cloudinary if found
      if (!isProfilePictureDefault) {
        const publicId = getPublicId(profilePicture);
        await cloudinary.uploader
          .destroy(publicId, {
            resource_type: "image",
          })
          .catch(() => undefined);
      }

      // delete uploaded file
      fs.unlink(profilePictureLocation, (err) => {
        if (err) throw err;
      });
    }

    const updatedAccount = await db.User.findOneAndUpdate(
      { firebaseId: firebaseId },
      {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        email: email,
        country: country,
        profilePicture: profilePictureUrl,
      },
      {
        new: true,
        projection: {
          firstName: 1,
          lastName: 1,
          birthDate: 1,
          email: 1,
          country: 1,
          profilePicture: 1,
        },
      },
    );

    res.status(200).send({
      id: updatedAccount._id,
      data: updatedAccount,
      message: "Success",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function deleteAccount(req, res, next) {
  try {
    const { email } = req.user;

    const { profilePicture, _id: userId } = await db.User.findOne(
      { email: email },
      { profilePicture: 1, _id: 1 },
    );

    // Delete user account
    const deletedAccount = await db.User.findOneAndDelete({ email });
    if (!deletedAccount) res.status(404).send({ message: "User not found!" });

    // Delete cloudinary picture
    // checking if old profile picture is the default one
    if (profilePicture !== DEFAULT_PROFILE_PICTURE) {
      const publicId = getPublicId(profilePicture);
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    }

    // Delete owned Playlists
    await db.Playlist.updateMany({ userId: userId }, { isDeleted: true });

    // Delete owned tracks from other's playlists
    const trackList = await db.Track.find({ userId: userId }, { _id: 1 });
    await trackList.forEach(async (track) => {
      await db.Playlist.updateMany(
        { trackId: track._id },
        { $pull: { trackId: track._id } },
      );
    });

    // Delete owned albums
    await db.Album.deleteMany({ userId: userId });

    // Delete tracks
    await db.Track.deleteMany({ userId: userId });

    // Delete follows
    await db.User.updateMany(
      { following: userId },
      { $pull: { following: userId } },
    );

    // Delete followers
    await db.User.updateMany(
      { followedBy: userId },
      { $pull: { followedBy: userId } },
    );

    res.status(200).send({
      // data: deletedAccount,
      message: "Success",
    });
  } catch (error) {
    res.status(410).send({ error: error.message });
    next(error);
  }
}

module.exports = {
  deleteAccount,
  getAccount,
  updateAccount,
};

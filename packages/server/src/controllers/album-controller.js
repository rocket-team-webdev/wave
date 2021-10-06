const db = require("../models");
const { cloudinary } = require("../services/cloudinary");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const { DEFAULT_ALBUM_THUMBNAIL } = require("../utils/default-presets");

async function getAlbums(req, res, next) {
  try {
    const { email } = req.user;
    const user = await db.User.findOne({ email });

    const albums = await db.Album.find({ userId: user._id });

    res.status(200).send({ albums });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

async function addAlbum(req, res, next) {
  try {
    const { _id: userId } = await db.User.findOne({ firebaseId }, { _id: 1 });
    const albumObj = {};
    let thumbnail = req.files["thumbnail"];

    // Checking if title album already exists
    const isAlbum = await db.Album.findOne(
      {
        title: req.body.title,
        userId: userId,
      },
      { _id: 1 },
    );
    if (isAlbum) {
      return res.status(409).send({ msg: "Error: Album already exists" });
    }

    // Album cover by default
    albumObj.thumbnail = DEFAULT_ALBUM_THUMBNAIL;
    // if there is a thumbnail
    if (thumbnail) {
      thumbnail = thumbnail[0];
      console.log("What we take for upload", thumbnail);
      const thumbnailLocation = path.join(
        __dirname,
        "../../",
        "uploads",
        thumbnail.originalname,
      );

      // upload file
      await writeFileAsync(
        thumbnailLocation,
        Buffer.from(new Uint8Array(thumbnail.buffer)),
      );

      // upload to cloudinary
      const cldThumbnailRes = await cloudinary.uploader.upload(
        thumbnailLocation,
        {
          upload_preset: "covers-preset",
          resource_type: "image",
          quality: "auto:good",
          width: 300,
          height: 300,
          crop: "limit",
        },
      );
      albumObj.thumbnail = cldThumbnailRes.secure_url;

      // delete uploaded file
      fs.unlink(thumbnailLocation, (err) => {
        if (err) throw err;
      });
    }
    // Mongodb store data
    const { firebaseId } = req.user;

    albumObj.title = req.body.title;
    albumObj.year = req.body.year;
    albumObj.userId = userId;

    await db.Album.create(albumObj);

    return res.status(200).send({ message: "album created successfully" });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  getAlbums,
  addAlbum,
};

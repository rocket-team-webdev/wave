const db = require("../models");
const { cloudinary } = require("../services/cloudinary");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

async function uploadTrack(req, res, next) {
  try {
    const trackObj = {};
    const track = req.files["track"][0];
    let thumbnail = req.files["thumbnail"];

    if (thumbnail) thumbnail = thumbnail[0];

    if (track.mimetype === "audio/mpeg") {
      const trackLocation = path.join(
        __dirname,
        "../../",
        "uploads",
        track.originalname,
      );

      await writeFileAsync(
        trackLocation,
        Buffer.from(new Uint8Array(track.buffer)),
      );

      // upload to cloudinary
      const cldTrackRes = await cloudinary.uploader.upload(trackLocation, {
        upload_preset: "tracks-preset",
        resource_type: "video",
      });

      // if there is a thumbnail
      if (thumbnail) {
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
          },
        );
        trackObj.thumbnail = cldThumbnailRes.secure_url;

        // delete uploaded file
        fs.unlink(thumbnailLocation, (err) => {
          if (err) throw err;
        });
      }

      // delete uploaded file
      fs.unlink(trackLocation, (err) => {
        if (err) throw err;
      });

      // Mogodb store data
      const { firebaseId } = req.user;
      const { _id: userId } = await db.User.findOne({ firebaseId });
      const genre = await db.Genre.findOne({ name: req.body.genre });
      const album = await db.Album.findOne({
        title: req.body.album,
      });

      trackObj.name = req.body.title;
      trackObj.url = cldTrackRes.secure_url;
      trackObj.public_id = cldTrackRes.public_id;
      trackObj.duration = cldTrackRes.duration;
      trackObj.userId = userId;
      if (album) trackObj.albums = [album._id];
      if (genre) trackObj.genreId = genre._id;

      await db.Track.create(trackObj);

      return res.status(200).send({ message: "cloudinary track uploaded" });
    }

    return res
      .status(400)
      .send({ message: "This file format is not supported!" });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

async function deleteTrack(req, res, next) {
  console.log("Deleting... ", req.params);
  const { id } = req.params;
  console.log(id);
  try {
    // ----
    // Delete from Cloudinary
    // const track = req.files["track"][0];
    //   const cldTrackRes = await cloudinary.uploader.destroy(trackLocation)
    // ----
    // Delete from MongoDB Atlas
    const track = await db.Track.findOne({ _id: id });
    console.log(track);
    return res.status(200).send({ message: "Successfully deleted track" });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  uploadTrack,
  deleteTrack,
};

const db = require("../models");
const { cloudinary } = require("../services/cloudinary");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const { getPublicId } = require("../utils/cloudinaryUtils");

async function getTracks(req, res, next) {
  try {
    const { page = 0, limit = 5 } = req.query;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const foundTracks = await db.Track.find(
      {},
      {
        name: 1,
        artist: 1,
        likes: { $size: "$likedBy" },
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
        popularity: 1,
        color: 1,
        genreId: 1,
        userId: 1,
        album: 1,
        duration: 1,
        url: 1,
      },
    )
      .populate({
        path: "album",
        options: {
          select: "title thumbnail",
        },
      })
      .sort({ popularity: -1 })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ tracks: foundTracks });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
    next(err);
  }
}

async function getTrack(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const track = await db.Track.findById(
      { _id: id },
      {
        name: 1,
        artist: 1,
        likes: { $size: "$likedBy" },
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
        popularity: 1,
        color: 1,
        genreId: 1,
        userId: 1,
        album: 1,
        duration: 1,
        url: 1,
      },
    )
      .populate({
        path: "album",
        options: {
          select: "title thumbnail",
        },
      })
      .populate("genreId", "name");

    res.status(200).send({
      data: track,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
    next(err);
  }
}

async function updateTrack(req, res, next) {
  try {
    const { id: trackId, title, artist, genre, album } = req.body;
    const foundGenre = await db.Genre.findOne({ name: `${genre}` }, { _id: 1 });
    const foundAlbum = await db.Album.findOne(
      { title: `${album}` },
      { _id: 1 },
    );
    const updatedTrack = await db.Track.findByIdAndUpdate(
      { _id: trackId },
      {
        name: title,
        artist: artist,
        genreId: foundGenre?._id,
        album: foundAlbum?._id,
      },
      {
        new: true,
        projection: {
          name: 1,
          artist: 1,
          popularity: 1,
          color: 1,
          genreId: 1,
          userId: 1,
          album: 1,
          duration: 1,
          url: 1,
        },
      },
    );

    res.status(200).send({
      id: trackId,
      data: updatedTrack,
      message: "Success",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function uploadTrack(req, res, next) {
  try {
    const trackObj = {};
    const track = req.files["track"][0];

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

      trackObj.name = req.body.name;
      trackObj.artist = req.body.artist;
      trackObj.url = cldTrackRes.secure_url;
      trackObj.public_id = cldTrackRes.public_id;
      trackObj.duration = cldTrackRes.duration;
      trackObj.userId = userId;
      if (album) trackObj.album = album._id;
      if (genre) trackObj.genreId = genre._id;

      console.log("trackObj", trackObj);

      const { _id: trackId } = await db.Track.create(trackObj);
      await db.Album.updateOne(
        { _id: album._id },
        { $inc: { totalTracks: 1 } },
      );

      return res
        .status(200)
        .send({ message: "cloudinary track uploaded", _id: trackId });
    }

    return res
      .status(415)
      .send({ message: "This file format is not supported!" });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

async function deleteTrack(req, res, next) {
  try {
    const { id } = req.params;
    const track = await db.Track.findOne({ _id: id }, { url: 1, album: 1 });
    const { url } = track;
    // ----
    // Delete from Cloudinary
    const publicId = getPublicId(url);
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
    // ----
    // Delete from MongoDB Atlas
    await db.Track.findByIdAndRemove(id);
    const album = await db.Album.findOne({ _id: track.album });

    if (album.totalTracks > 0)
      await db.Album.updateOne(
        { _id: album._id },
        { $inc: { totalTracks: -1 } },
      );

    // Delete song from playlists
    await db.Playlist.updateMany({ trackId: id }, { $pull: { trackId: id } });
    // Delete song from playback
    await db.Playback.deleteOne({ trackId: id });

    return res.status(200).send({ message: "Successfully deleted track" });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

async function likeTrack(req, res, next) {
  try {
    const { id: trackId } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    await db.Track.findOneAndUpdate({ _id: trackId }, [
      {
        $set: {
          likedBy: {
            $cond: {
              if: { $in: [userId, "$likedBy"] },
              then: { $setDifference: ["$likedBy", [userId]] },
              else: { $concatArrays: ["$likedBy", [userId]] },
            },
          },
        },
      },
    ]);

    return res.status(200).send({ message: "Successfully liked/unliked" });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  getTracks,
  uploadTrack,
  deleteTrack,
  getTrack,
  updateTrack,
  likeTrack,
};

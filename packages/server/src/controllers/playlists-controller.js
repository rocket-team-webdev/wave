const fs = require("fs");
const path = require("path");
const db = require("../models");
const { cloudinary } = require("../services/cloudinary");
const { promisify } = require("util");
const { getPublicId } = require("../utils/cloudinaryUtils");
const { DEFAULT_PLAYLIST_THUMBNAIL } = require("../utils/default-presets");
const writeFileAsync = promisify(fs.writeFile);

async function getPlaylists(req, res, next) {
  try {
    const { email } = req.user;
    const { page = 0, limit = 4 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const foundPlaylists = await db.Playlist.aggregate([
      {
        $match: {
          $or: [{ publicAccessible: true }, { userId: userId }],
          isDeleted: false,
        },
      },
      {
        $project: {
          name: 1,
          follows: { $size: "$followedBy" },
          isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
          primaryColor: 1,
          thumbnail: 1,
          userId: 1,
        },
      },
      {
        $sort: {
          follows: -1,
        },
      },
    ])
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ playlists: foundPlaylists });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function addPlaylist(req, res, next) {
  try {
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const playlistObj = {};
    let thumbnail = req.files["thumbnail"];

    // Playlist cover by default
    playlistObj.thumbnail = DEFAULT_PLAYLIST_THUMBNAIL;

    // if there is a thumbnail
    if (thumbnail) {
      thumbnail = thumbnail[0];
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
      playlistObj.thumbnail = cldThumbnailRes.secure_url;

      // delete uploaded file
      fs.unlink(thumbnailLocation, (err) => {
        if (err) throw err;
      });
    }

    // Mongodb store data
    playlistObj.name = req.body.name;
    playlistObj.description = req.body.description;
    playlistObj.primaryColor = req.body.primaryColor;
    playlistObj.collaborative = req.body.collaborative;
    playlistObj.publicAccessible = req.body.publicAccessible;
    playlistObj.userId = userId;

    const data = await db.Playlist.create(playlistObj);

    return res
      .status(200)
      .send({ message: "Playlist created successfully", playlistId: data._id });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function updatePlaylist(req, res, next) {
  try {
    const { email } = req.user;
    const { id: playlistId } = req.body;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const { thumbnail: oldThumbnail } = await db.Playlist.findOne(
      { _id: playlistId, userId: userId },
      {
        thumbnail: 1,
        _id: 0,
      },
    );

    let thumbnailUrl = oldThumbnail;
    let thumbnailFile = req.files["thumbnail"];

    if (thumbnailFile) {
      const isThumbnailDefault =
        oldThumbnail === DEFAULT_PLAYLIST_THUMBNAIL ? true : false;

      thumbnailFile = thumbnailFile[0];
      const thumbnailLocation = path.join(
        __dirname,
        "../../",
        "uploads",
        thumbnailFile.originalname,
      );

      // upload file
      await writeFileAsync(
        thumbnailLocation,
        Buffer.from(new Uint8Array(thumbnailFile.buffer)),
      );

      // upload to cloudinary
      const cldThumbnailRes = await cloudinary.uploader.upload(
        thumbnailLocation,
        {
          upload_preset: "covers-preset",
          resource_type: "image",
          width: 300,
          height: 300,
          crop: "limit",
        },
      );
      thumbnailUrl = cldThumbnailRes.secure_url;

      // delete old picture on cloudinary
      if (!isThumbnailDefault) {
        const publicId = getPublicId(oldThumbnail);
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      }

      // delete uploaded file
      fs.unlink(thumbnailLocation, (err) => {
        if (err) throw err;
      });
    }

    const { name, description, primaryColor, publicAccessible } = req.body;
    await db.Playlist.findOneAndUpdate(
      { _id: playlistId },
      {
        name: name,
        description: description,
        primaryColor: primaryColor,
        publicAccessible: publicAccessible,
        thumbnail: thumbnailUrl,
      },
    );

    res.status(200).send({
      message: "Playlist updated successfully!",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
    next(error);
  }
}

async function getPlaylistById(req, res, next) {
  try {
    const { id: playlistId } = req.params;
    const { email } = req.user;
    const { page = 0, limit = 5 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const playlist = await db.Playlist.findOne(
      {
        _id: playlistId,
        isDeleted: false,
        $or: [{ publicAccessible: true }, { userId: userId }],
      },
      {
        name: 1,
        collaborative: 1,
        follows: { $size: "$followedBy" },
        isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
        description: 1,
        primaryColor: 1,
        thumbnail: 1,
        publicAccessible: 1,
        userId: 1,
        tracks: 1,
      },
    )
      .populate([
        {
          path: "tracks",
          select: {
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
          options: {
            skip: parseInt(page) * parseInt(limit),
            limit: parseInt(limit),
          },
          populate: [
            {
              path: "album",
              options: {
                select: "title thumbnail",
              },
            },
            {
              path: "genreId",
              options: {
                select: "name",
              },
            },
          ],
        },
        {
          path: "userId",
          options: { select: "firstName" },
        },
      ])
      .orFail();
    res.status(200).send({ data: playlist });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function deletePlaylist(req, res, next) {
  try {
    const { id: playlistId } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    await db.Playlist.findOneAndUpdate(
      { _id: playlistId, userId: userId },
      { isDeleted: true },
    );

    res.status(200).send({
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function followPlaylist(req, res, next) {
  try {
    const { id: playlistId } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    await db.Playlist.findOneAndUpdate({ _id: playlistId, isDeleted: false }, [
      {
        $set: {
          followedBy: {
            $cond: {
              if: { $in: [userId, "$followedBy"] },
              then: { $setDifference: ["$followedBy", [userId]] },
              else: { $concatArrays: ["$followedBy", [userId]] },
            },
          },
        },
      },
    ]);

    res.status(200).send({
      message: "Playlist followed successfully",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function addTrackToPlaylist(req, res, next) {
  try {
    const { playlistId, trackId } = req.body;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const result = await db.Playlist.findOneAndUpdate(
      {
        _id: playlistId,
        isDeleted: false,
        userId: userId,
        tracks: { $nin: trackId },
      },
      {
        $push: { tracks: trackId },
      },
      {
        projection: { _id: 1 },
      },
    );
    if (result) {
      res.status(200).send({
        message: "Playlist updated successfully",
      });
    } else {
      res.status(400).send({
        message: "Playlist already contains song",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function removeTrackFromPlaylist(req, res, next) {
  try {
    const { playlistId, trackId } = req.body;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    await db.Playlist.findOneAndUpdate(
      {
        _id: playlistId,
        isDeleted: false,
        userId: userId,
        tracks: trackId,
      },
      {
        $pull: { tracks: trackId },
      },
    );

    res.status(200).send({
      message: "Playlist updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function reorderTracksInPlaylist(req, res, next) {
  try {
    const { source, destination, playlistId } = req.body;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    await db.Playlist.findOneAndUpdate(
      {
        _id: playlistId,
        userId: userId,
        tracks: { $in: [source.trackId] },
      },
      {
        $pull: { tracks: source.trackId },
      },
    );

    await db.Playlist.updateOne(
      { _id: playlistId, userId },
      {
        $push: {
          tracks: { $each: [source.trackId], $position: destination.index },
        },
      },
    );

    res.status(200).send({
      message: "Playlist updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

module.exports = {
  getPlaylists,
  addPlaylist,
  updatePlaylist,
  getPlaylistById,
  deletePlaylist,
  followPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  reorderTracksInPlaylist,
};

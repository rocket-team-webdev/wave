const albumModel = require("./album-model");
const genreModel = require("./genre-model");
const playbackModel = require("./playback-model");
const playlistModel = require("./playlist-model");
const trackModel = require("./track-model");
const userModel = require("./user-model");

module.exports = {
  Album: albumModel,
  Genre: genreModel,
  Playback: playbackModel,
  Playlist: playlistModel,
  Track: trackModel,
  User: userModel,
};

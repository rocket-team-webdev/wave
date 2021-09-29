const accountController = require("./account-controller");
const userController = require("./user-controller");
const trackController = require("./track-controller");
const genreController = require("./genre-controller");
const albumController = require("./album-controller");
const playlistsController = require("./playlists-controller");

module.exports = {
  accountController: accountController,
  userController: userController,
  trackController: trackController,
  genreController: genreController,
  albumController: albumController,
  playlistsController: playlistsController,
};

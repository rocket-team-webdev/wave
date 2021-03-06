const accountController = require("./account-controller");
const authController = require("./auth-controller");
const trackController = require("./track-controller");
const genreController = require("./genre-controller");
const albumController = require("./album-controller");
const searchController = require("./search-controller");
const meController = require("./me-controller");
const playlistsController = require("./playlists-controller");
const usersController = require("./users-controller");

module.exports = {
  accountController: accountController,
  authController: authController,
  trackController: trackController,
  genreController: genreController,
  albumController: albumController,
  searchController: searchController,
  meController: meController,
  playlistsController: playlistsController,
  usersController: usersController,
};

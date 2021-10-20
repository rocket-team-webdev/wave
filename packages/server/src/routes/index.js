const { accountRouter } = require("./account-router");
const { authRouter } = require("./auth-routes");
const { trackRouter } = require("./track-routes");
const { genreRouter } = require("./genre-routes");
const { albumRouter } = require("./album-routes");
const { searchRouter } = require("./search-routes");
const { meRouter } = require("./me-routes");
const { playlistsRouter } = require("./playlists-routes");
const { usersRouter } = require("./users-routes");

module.exports = {
  accountRouter,
  authRouter,
  trackRouter,
  genreRouter,
  albumRouter,
  searchRouter,
  meRouter,
  playlistsRouter,
  usersRouter,
};

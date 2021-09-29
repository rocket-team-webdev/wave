const { accountRouter } = require("./account-router");
const { userRouter } = require("./user-routes");
const { trackRouter } = require("./track-routes");
const { genreRouter } = require("./genre-routes");
const { playlistsRouter } = require("./playlists-routes");

module.exports = {
  accountRouter,
  userRouter,
  trackRouter,
  genreRouter,
  playlistsRouter,
};

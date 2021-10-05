const { accountRouter } = require("./account-router");
const { userRouter } = require("./user-routes");
const { trackRouter } = require("./track-routes");
const { genreRouter } = require("./genre-routes");
const { albumRouter } = require("./album-routes");
const { searchRouter } = require("./search-routes");
const { meRouter } = require("./me-routes");
const { playlistsRouter } = require("./playlists-routes");

module.exports = {
  accountRouter,
  userRouter,
  trackRouter,
  genreRouter,
  albumRouter,
  searchRouter,
  meRouter,
  playlistsRouter,
};

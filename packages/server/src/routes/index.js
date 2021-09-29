const { accountRouter } = require("./account-router");
const { userRouter } = require("./user-routes");
const { meRouter } = require("./me-routes");
const { playlistsRouter } = require("./playlists-routes");

module.exports = {
  accountRouter,
  userRouter,
  meRouter,
  playlistsRouter,
};

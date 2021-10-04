const { playlistsController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const playlistsRouter = Router();

playlistsRouter.get(
  "/",
  authFirebaseMiddleware,
  playlistsController.getPlaylists,
);

playlistsRouter.get(
  "/:id",
  authFirebaseMiddleware,
  playlistsController.getPlaylist,
);

module.exports = {
  playlistsRouter,
};

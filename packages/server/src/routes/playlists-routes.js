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

playlistsRouter.post(
  "/",
  authFirebaseMiddleware,
  playlistsController.addPlaylist,
);

playlistsRouter.put(
  "/",
  authFirebaseMiddleware,
  playlistsController.updatePlaylist,
);

playlistsRouter.get(
  "/:id",
  authFirebaseMiddleware,
  playlistsController.getPlaylistById,
);

playlistsRouter.delete(
  "/:id",
  authFirebaseMiddleware,
  playlistsController.deletePlaylist,
);

playlistsRouter.put(
  "/:id/follow",
  authFirebaseMiddleware,
  playlistsController.followPlaylist,
);

module.exports = {
  playlistsRouter,
};

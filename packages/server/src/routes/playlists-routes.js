const { playlistsController } = require("../controllers");
const Router = require("express").Router;
const multer = require("multer"); //use multer to upload blob data
const upload = multer(); // setup the multer

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const playlistsRouter = Router();
const mdlUpload = upload.fields([{ name: "thumbnail" }]);

playlistsRouter.get(
  "/",
  authFirebaseMiddleware,
  playlistsController.getPlaylists,
);

playlistsRouter.post(
  "/",
  [authFirebaseMiddleware, mdlUpload],
  playlistsController.addPlaylist,
);

playlistsRouter.put(
  "/",
  [authFirebaseMiddleware, mdlUpload],
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

playlistsRouter.post(
  "/add-track",
  authFirebaseMiddleware,
  playlistsController.addTrackToPlaylist,
);

playlistsRouter.put(
  "/remove-track",
  authFirebaseMiddleware,
  playlistsController.removeTrackFromPlaylist,
);

playlistsRouter.put(
  "/reorder",
  authFirebaseMiddleware,
  playlistsController.reorderTracksInPlaylist,
);

module.exports = {
  playlistsRouter,
};

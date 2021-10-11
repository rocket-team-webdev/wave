const { albumController } = require("../controllers");
const multer = require("multer"); //use multer to upload blob data
const upload = multer(); // setup the multer
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const albumRouter = Router();
const mdlUpload = upload.fields([{ name: "thumbnail" }]);

albumRouter.get("", authFirebaseMiddleware, albumController.getAlbums);

albumRouter.get("/:id", authFirebaseMiddleware, albumController.getAlbumById);

albumRouter.post(
  "",
  [authFirebaseMiddleware, mdlUpload],
  albumController.addAlbum,
);

albumRouter.put(
  "/",
  [authFirebaseMiddleware, mdlUpload],
  albumController.updateAlbum,
);

albumRouter.delete("/:id", authFirebaseMiddleware, albumController.deleteAlbum);

albumRouter.put("/:id/like", authFirebaseMiddleware, albumController.likeAlbum);

module.exports = {
  albumRouter,
};

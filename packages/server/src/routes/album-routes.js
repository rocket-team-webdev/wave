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

albumRouter.delete("/:id", authFirebaseMiddleware, albumController.deleteAlbum);

module.exports = {
  albumRouter,
};

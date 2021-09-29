const { trackController } = require("../controllers");
const multer = require("multer"); //use multer to upload blob data
const upload = multer(); // setup the multer
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const trackRouter = Router();
const mdlUpload = upload.fields([{ name: "thumbnail" }, { name: "track" }]);

trackRouter.post(
  "",
  [authFirebaseMiddleware, mdlUpload],
  trackController.uploadTrack,
);

trackRouter.delete("/:id", trackController.deleteTrack);

module.exports = {
  trackRouter,
};

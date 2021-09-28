const { trackController } = require("../controllers");
const multer = require("multer"); //use multer to upload blob data
const upload = multer(); // setup the multer
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const trackRouter = Router();

trackRouter.post(
  "/upload",
  [authFirebaseMiddleware, upload.single("file")],
  trackController.uploadTrack,
);

module.exports = {
  trackRouter,
};

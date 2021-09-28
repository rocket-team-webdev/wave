const { trackController } = require("../controllers");

const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const trackRouter = Router();

trackRouter.post("/upload", authFirebaseMiddleware, trackController.upload);

module.exports = {
  trackRouter,
};

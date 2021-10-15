const { userController } = require("../controllers");
const multer = require("multer"); //use multer to upload blob data
const upload = multer(); // setup the multer
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
  authRegisterMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const authRouter = Router();
const mdlUpload = upload.fields([{ name: "profilePicture" }]);

authRouter.post(
  "/register",
  [authRegisterMiddleware, mdlUpload],
  userController.signUp,
);
authRouter.get("/authenticate", authFirebaseMiddleware, userController.signIn);

module.exports = {
  authRouter,
};

const { userController } = require("../controllers");
const multer = require("multer"); //use multer to upload blob data
const upload = multer(); // setup the multer
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
  authRegisterMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const userRouter = Router();
const mdlUpload = upload.fields([{ name: "profilePicture" }]);

userRouter.post(
  "/register",
  [authRegisterMiddleware, mdlUpload],
  userController.signUp,
);
userRouter.get("/authenticate", authFirebaseMiddleware, userController.signIn);

module.exports = {
  userRouter,
};

const { userController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
  authRegisterMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const userRouter = Router();

userRouter.post("/register", authRegisterMiddleware, userController.signUp);

userRouter.get("/authenticate", authFirebaseMiddleware, userController.signIn);

module.exports = {
  userRouter,
};

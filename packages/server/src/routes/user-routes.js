const { userController } = require("../controllers");
const Router = require("express").Router;

const {
  authRegisterMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const userRouter = Router();

userRouter.post("/register", authRegisterMiddleware, userController.signUp);

module.exports = {
  userRouter,
};

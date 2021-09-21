const { userController } = require("../controllers");
const Router = require("express").Router;

const userRouter = Router();

userRouter.post("/register", userController.signUp);

module.exports = {
  userRouter,
};

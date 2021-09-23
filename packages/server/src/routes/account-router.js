const Router = require("express").Router;
const { accountController } = require("../controllers");

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const accountRouter = Router();

accountRouter.get("/", authFirebaseMiddleware, accountController.getAccount);

accountRouter.post(
  "/",
  authFirebaseMiddleware,
  accountController.updateAccount,
);

module.exports = {
  accountRouter: accountRouter,
};

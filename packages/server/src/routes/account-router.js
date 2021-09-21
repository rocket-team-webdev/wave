const Router = require("express").Router;
const { accountController } = require("../controllers");

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const accountRouter = Router();

accountRouter.get(
  "/account/",
  authFirebaseMiddleware,
  accountController.getAccount,
);

accountRouter.post(
  "/account/:id",
  authFirebaseMiddleware,
  accountController.updateAccount,
);

module.exports = {
  accountRouter: accountRouter,
};

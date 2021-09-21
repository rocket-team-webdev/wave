const Router = require("express").Router;
const { accountController } = require("../controllers");

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const accountRouter = Router();

accountRouter.get(
  "/account/",
  authFirebaseMiddleware,
  accountController.getUser,
);
accountRouter.post(
  "account/:id",
  authFirebaseMiddleware,
  accountController.updateUser,
);

module.exports = {
  accountRouter: accountRouter,
};

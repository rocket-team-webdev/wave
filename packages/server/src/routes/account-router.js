const Router = require("express").Router;
const { accountController } = require("../controllers");

const accountRouter = Router();

accountRouter.get("/account/", accountController.getUser);
accountRouter.post("account/:id", accountController.updateUser);

module.exports = {
  accountRouter: accountRouter,
};

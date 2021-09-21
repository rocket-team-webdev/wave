const Router = require("express").Router;
const { accountController } = require("../controllers");

const accountRouter = Router();

accountRouter.get("/", accountController.getUser);

module.exports = {
  accountRouter: accountRouter,
};

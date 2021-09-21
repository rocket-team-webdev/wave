const Router = require("express").Router;
const { accountController } = require("../controllers");

const accountRouter = Router();

accountRouter.get("/", accountController.getUser);
accountRouter.post("/:id", accountController.updateUser);

module.exports = {
  accountRouter: accountRouter,
};

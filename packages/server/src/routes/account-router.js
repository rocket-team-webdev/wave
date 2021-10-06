const Router = require("express").Router;
const { accountController } = require("../controllers");
const multer = require("multer"); //use multer to upload blob data
const upload = multer(); // setup the multer

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const accountRouter = Router();

accountRouter.get("/", authFirebaseMiddleware, accountController.getAccount);
const mdlUpload = upload.fields([{ name: "profilePicture" }]);

accountRouter.post(
  "/",
  [authFirebaseMiddleware, mdlUpload],
  accountController.updateAccount,
);

accountRouter.delete(
  "/",
  authFirebaseMiddleware,
  accountController.deleteAccount,
);

module.exports = {
  accountRouter: accountRouter,
};

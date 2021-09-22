const { getAuthToken, verifyAuthToken } = require("../services/firebase");
const db = require("../models");

async function authFirebaseMiddleware(req, res, next) {
  try {
    const bearerToken = await getAuthToken(req.headers);
    const userClaims = await verifyAuthToken(bearerToken);
    const user = await db.User.findOne({
      email: userClaims.email,
    });

    if (!user && req.url !== "/register") {
      throw new Error("Invalid token");
    }

    req.user = {
      email: userClaims.email,
      firebaseId: userClaims.uid,
    };

    next();
  } catch (error) {
    res.status(401).send({ error: error });
    next(error);
  }
}

async function authRegisterMiddleware(req, res, next) {
  try {
    const bearerToken = await getAuthToken(req.headers);
    const userClaims = await verifyAuthToken(bearerToken);
    const user = await db.User.findOne({
      email: userClaims.email,
    });

    if (user) {
      throw new Error("User already exists!");
    }

    req.user = {
      email: userClaims.email,
      firebaseId: userClaims.uid,
    };

    next();
  } catch (error) {
    res.status(401).send({ error: error });
    next(error);
  }
}
module.exports = {
  authFirebaseMiddleware,
  authRegisterMiddleware,
};

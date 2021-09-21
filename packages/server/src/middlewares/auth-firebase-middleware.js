const { getAuthToken, verifyAuthToken } = require("../services/firebase");
const db = require("../models");

async function authFirebaseMiddleware(req, res, next) {
  try {
    const bearerToken = await getAuthToken(req.headers);
    const userClaims = await verifyAuthToken(bearerToken);

    const user = await db.User.findOne({
      email: userClaims.email,
    });

    if (!user) {
      throw new Error("Invalid token");
    }

    req.user = {
      email: userClaims.email,
      firebaseId: userClaims.uid,
    };

    next();
  } catch (error) {
    res.status(401).send({ error: error });
  }
}

module.exports = {
  authFirebaseMiddleware: authFirebaseMiddleware,
};

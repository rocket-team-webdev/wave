const { verifyAuthToken } = require("./auth");
const { getAuthToken } = require("./get-auth-token");

module.exports = {
  verifyAuthToken: verifyAuthToken,
  getAuthToken: getAuthToken,
};

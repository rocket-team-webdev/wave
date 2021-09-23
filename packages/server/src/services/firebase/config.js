const dotenv = require("dotenv");

dotenv.config();

const {
  FB_CERT_TYPE,
  FB_CERT_PROJECT_ID,
  FB_CERT_PRIVATE_KEY_ID,
  FB_CERT_PRIVATE_KEY,
  FB_CERT_CLIENT_EMAIL,
  FB_CERT_CLIENT_ID,
  FB_CERT_AUTH_URI,
  FB_CERT_TOKEN_URI,
  FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
  FB_CERT_CLIENT_X_509_CERT_URL,
} = process.env;

const firebaseCertConfig = {
  type: FB_CERT_TYPE,
  project_id: FB_CERT_PROJECT_ID,
  private_key_id: FB_CERT_PRIVATE_KEY_ID,
  private_key: FB_CERT_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  client_email: FB_CERT_CLIENT_EMAIL,
  client_id: FB_CERT_CLIENT_ID,
  auth_uri: FB_CERT_AUTH_URI,
  token_uri: FB_CERT_TOKEN_URI,
  auth_provider_x509_cert_url: FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
  client_x509_cert_url: FB_CERT_CLIENT_X_509_CERT_URL,
};

module.exports = firebaseCertConfig;

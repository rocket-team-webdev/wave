module.exports = {
  "**/*.js": [
    "npm run lint:js",
    "npm run lint:format:check",
    "npm run test:related",
  ],
  "*.{md,json,yml,yaml}": ["npm run lint:format:check"],
};

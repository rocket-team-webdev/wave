const packageJson = require("./package.json");
const devDependencies = Object.keys(packageJson.devDependencies || {});

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "prettier",
    "prettier/prettier",
    "plugin:node/recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    requireConfigFile: "false",
  },
  plugins: ["jest"],
  rules: {
    "prefer-destructuring": "off",
    "object-shorthand": "off",
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
    "node/no-unpublished-require": [
      "error",
      {
        allowModules: devDependencies,
      },
    ],
  },
};

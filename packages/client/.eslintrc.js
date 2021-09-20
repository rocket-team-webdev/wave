module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    requireConfigFile: "false",
    jsx: true,
  },
  plugins: [
    "html",
    "jest",
    "react",
    "react-hooks",
    "jsx-a11y",
    "markdown",
    "react-hooks",
    "import",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
    jest: {
      version: 26,
    },
  },
  overrides: [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
    },
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    "prefer-destructuring": "off",
    "object-shorthand": "off",
    "react/jsx-props-no-spreading": "off",
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
    "react/forbid-prop-types": "off",
    "react/prop-types": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/label-has-for": "off",
  },
};

module.exports = {
  babelrcRoots: [
    // Keep the root as a root
    ".",
    // Also consider monorepo packages "root" and load their .babelrc.json files.
    "packages/client",
    "packages/server",
  ],
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};

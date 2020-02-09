const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].js"
  },
  node: {
    fs: "empty",
    cluster: "empty"
  }
};

const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].js"
  },
  devtool: "inline-source-map",
  node: {
    fs: "empty",
    cluster: "empty"
  }
};

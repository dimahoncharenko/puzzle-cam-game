const { resolve } = require("path");
const externals = require("webpack-node-externals");

module.exports = {
  entry: "./index.ts",
  output: {
    path: resolve("./"),
    filename: "server.bundle.js",
  },
  devtool: "inline-source-map",
  externals: [externals()],
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
};

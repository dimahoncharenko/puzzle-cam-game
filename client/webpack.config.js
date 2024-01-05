const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: resolve("./build"),
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".json", ".scss", ".tsx", ".js", ".jsx"],
  },
  
  resolve: {
    extensions: [
      ".jsx",
      ".js",
      ".ts",
      ".tsx",
      ".json",
      ".wav",
      ".svg",
      ".css",
      ".scss",
      ".sass",
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts?x|js?x)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(css|scss|sass)$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpeg|jpg|svg|wav)$/,
        exclude: /node_modules/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
};

"use strict";
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

module.exports = {
  node: {
    __dirname: false,
    __filename: false,
  },
  target: "node",
  output: {
    path: __dirname + "/build",
    filename: "[name].js"
  },
  entry: {
    index: "./src/index.js",
    test: "./test/test.js"
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
      }
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.SourceMapDevToolPlugin({}),
    new CopyWebpackPlugin({
      patterns: [
        { from: "package.json", to: __dirname + "/build/package.json" }
      ],
    }),
  ]
};

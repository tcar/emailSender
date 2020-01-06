const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./client/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        query: {
          presets: ["@babel/react", "@babel/preset-env"]
        }
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};

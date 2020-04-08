var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  devtool: "cheap-module-source-map",
  context: path.join(__dirname, "src"),
  entry: path.join(__dirname, "src", "index.ts"),
  // app: "./app/app.js",
  // about: "./about/about.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        include: path.join(__dirname, "src"),
        // exclude: /node_modules/
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    inline: true,
    stats: {
      colors: true,
      reasons: true,
      chunks: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      hash: true,
      //   chunks: ["app"],
    }),

    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "src", "index.html"),
    //   hash: true,
    //   filename: "about.html",
    //   chunks: ["about"],
    // }),
  ],
};

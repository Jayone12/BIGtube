const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/client/js/";

module.exports = {
  // 변환할 파일 위치
  entry: {
    main: `${BASE_JS}main.js`,
    videoPlayer: `${BASE_JS}videoPlayer.js`,
    recorder: `${BASE_JS}recorder.js`,
    commentSection: `${BASE_JS}commentSection.js`,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    // 변환 후 저장할 파일명
    filename: "js/[name].js",
    // 변환 후 저장 위치
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};

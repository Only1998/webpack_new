const path = require("path");
module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist/"),
    // filename: 'bundle.js' //单个入口
    filename: "[name].[hash].js",
  },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "production", //development production
  entry: {
    index: "./src/index.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist/"),
    // filename: 'bundle.js' //单个入口
    filename: "[name].js",
  },
  module: {
    rules: [
      //css
      {
        test: /\.css$/,
        use: [
          { loader: miniCssExtractPlugin.loader },
          { loader: "css-loader" },
        ],
      },
      //sass
      {
        test: /\.scss$/,
        use: [
          { loader: miniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      //less
      {
        test: /\.less$/,
        use: [
          { loader: miniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
      //图片
      // {
      //   test: /\.(jpg|png|gif|webp|jpeg)$/,
      //   use: [{ loader: "file-loader" }],
      // },
      //base64编码格式图片
      {
        test: /\.(jpg|png|gif|webp|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 102400, //图片小于100k时转化为base64
            },
          },
        ],
      },
      //es6==>es5
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env"],
            },
          },
        ],
      },
    ],
  },
  //打包HTML
  plugins: [
    new HtmlWebpackPlugin({
      title: "网页标题", // 需要在模板文件中的title填写为：<%= htmlWebpackPlugin.options.title %>
      template: "./src/tpl.html",
      inject: "body",
      // body： script标签位于html文件的body底部；
      // head： script标签位于html文件的head中；
      // false：不插入生成的js文件。
      minify: {
        // html压缩规则
        removeComments: true, // 是否移除注释
        removeAttributeQuotes: true, // 是否省略标签属性的引号
        collapseWhitespace: true, // 是否删除文件的空白字符
      },
      filename: "index.html", // 输出模板名称, 默认为index.html
    }),
    new miniCssExtractPlugin({
      filename: "[name].[hash].css",
    }),
  ],
};

const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  title: "Test Webpack",
});

module.exports = (env) => {
  const mode = env.production === true ? "production" : "development";
  let publicPath = env.base ?? "/";
  if (!publicPath.endsWith("/")) {
    publicPath += "/";
  }

  console.log("Running in", mode);
  console.log("Running at", publicPath);

  return {
    mode,
    entry: {
      index: ["./src/index.ts"],
    },
    devtool: mode === "production" ? undefined : "inline-source-map",
    devServer: {
      compress: false,
      port: 9000,
      client: {
        progress: true,
        reconnect: true,
        webSocketTransport: "ws",
      },
      webSocketServer: "ws",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    output: {
      filename: "js/[name].[contenthash].bundle.js",
      chunkFilename: "js/chunks/[id].[contenthash].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath,
    },
    plugins: [
      new FaviconsWebpackPlugin({
        logo: "src/assets/icon.svg",
        favicons: {
          appDescription: "My awesome Progressive Web App!",
          start_url: publicPath,
          appName: "Fresh App Banana 😎",
          appShortName: "Fa🤣",
          lang: "en-EN",
          background: "#fff",
          theme_color: "#fff",
          pixel_art: true,
        },
      }),
      new EnvironmentPlugin({
        PUBLIC_PATH: publicPath,
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/chunks/[id].[contenthash].css",
      }),
      htmlPlugin,
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        mode,
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };
};

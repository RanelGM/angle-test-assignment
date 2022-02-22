const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = (env) => {
  const isDevelopment = env.development;

  return {
    mode: isDevelopment ? "development" : "production",
    devtool: isDevelopment ? "source-map" : undefined,
    entry: "./src/index.tsx",
    output: {
      path: `${__dirname}/dist/`,
      clean: true,
    },
    devServer: {
      port: 3000,
      client: {
        logging: "error",
      },
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            plugins: [new TsconfigPathsPlugin()],
          },
          use: "ts-loader",
        },
        {
          test: /\.s[ac]ss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [postcssPresetEnv()],
                ],
              },
            },
          }],

        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/img/[name][ext][query]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name][ext][query]",
          },
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./static/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new CopyPlugin({
        patterns: [{ from: "static/assets/img", to: "assets/img" }],
      }),
    ],
  };
};

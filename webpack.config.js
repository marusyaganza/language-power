const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const modeConfig = env =>
  require(`./build-utils/mode-configs/webpack.${env}`)(env);
const webpackMerge = require('webpack-merge');
const loadPresets = require('./build-utils/load-presets');

module.exports = ({ mode, presets, ...rest } = { mode: 'production', presets: [] }) => {
  const envKeys = Object.keys(rest).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(rest[next]);
    return prev;
  }, {});
  return webpackMerge(
    {
      mode,
      output: {
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.(jpg|jpeg|png|svg|gif|webp)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 500
              }
            }
          },
          {
            test: /\.(woff|woff2|ttf)$/,
            use: 'file-loader'
          }
        ]
      },

      plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html', favicon: './favicon.ico', }),
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin(envKeys),
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig(mode),
    loadPresets({ presets })
  );
};

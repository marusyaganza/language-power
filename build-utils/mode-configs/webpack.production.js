const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = () => {
  return {
    output: {
      path: path.resolve(__dirname, '../../', 'public'),
      filename: '[chunkhash].js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css'
      }),
      new CopyPlugin([{ from: 'robots.txt' }])
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]__[hash:base64]'
                },
                localsConvention: 'camelCaseOnly',
                esModule: true
              }
            }
          ]
        }
      ]
    }
  };
};

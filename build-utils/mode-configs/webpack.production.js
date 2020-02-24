const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  return {
    output: {
      filename: '[chunkhash].js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css'
      })
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

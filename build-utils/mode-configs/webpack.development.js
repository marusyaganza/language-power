const path = require('path');

module.exports = () => {
  return {
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                },
                sourceMap: true,
                localsConvention: 'camelCaseOnly',
                esModule: true
              }
            }
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './dist'
    },
    devtool: 'inline-source-map'
  };
};

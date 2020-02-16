const path = require('path');

module.exports = () => {
  return {
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    devServer: {
      historyApiFallback: true
    }
  };
};

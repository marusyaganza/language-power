const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = () => {
    return {
        output: {
            filename: "[chunkhash].js"
        }
    }
};
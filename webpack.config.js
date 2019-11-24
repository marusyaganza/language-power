const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const webpackMerge = require('webpack-merge');

module.exports = ({mode, presets} = {mode: 'production', presets: []}) => {
    return webpackMerge({
        mode,
        output: {
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(jpg|jpeg|png|svg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 500
                        }
                    }
                }
            ]
        },

        plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()]
    },
        modeConfig(mode))
};
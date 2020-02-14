const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const modeConfig = env => require(`./build-utils/mode-configs/webpack.${env}`)(env);
const webpackMerge = require('webpack-merge');
const loadPresets = require('./build-utils/load-presets');

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
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.(jpg|jpeg|png|svg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 500
                        }
                    }
                },
                {
                    test: /\.woff$/,
                    use: 'file-loader'
                }
            ]
        },

        plugins: [new HtmlWebpackPlugin({template: 'src/index.html'}), new webpack.ProgressPlugin(), new MiniCssExtractPlugin()]
    },
        modeConfig(mode),
    loadPresets({presets})
    )
};
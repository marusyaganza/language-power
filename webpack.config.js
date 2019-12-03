const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const webpackMerge = require('webpack-merge');
const loadPresets = require('./build-utils/load-presets');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                        test: /\.js?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            plugins: [new MiniCssExtractPlugin()]
        },
        modeConfig(mode),
    loadPresets({presets})
    )
};
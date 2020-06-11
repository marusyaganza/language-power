/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssnanoPlugin = require('cssnano-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const webpack = require('webpack');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const path = require('path');

module.exports = () => {
  return {
    output: {
      path: path.resolve(__dirname, '../../', 'public'),
      filename: '[name].[chunkhash:16].js'
    },
    optimization: {
      minimize: true,
      runtimeChunk: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        }),
        new CssnanoPlugin({
          cssnanoOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true }
              }
            ]
          }
        })
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[id].[chunkhash:16].css',
        chunkFilename: '[id].[chunkhash:16].css'
      }),
      new CopyPlugin([{ from: 'static/*', flatten: true }]),
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'allChunks'
      }),
      new CssoWebpackPlugin(),
      new CompressionPlugin({ test: /\.(js|css)$/, algorithm: 'gzip' }),
      new BrotliPlugin({ test: /\.(js|css)$/ }),
      new webpack.HashedModuleIdsPlugin(),
      new DuplicatePackageCheckerPlugin({ verbose: true, emitError: true }),
      new WebpackBundleAnalyzer()
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
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
              plugins: [
                ['@babel/transform-runtime'],
                'syntax-jsx',
                [
                  'transform-react-remove-prop-types',
                  {
                    removeImport: true
                  }
                ]
              ]
            }
          }
        }
      ]
    }
  };
};

const path = require('path');
const WebpackNodeExternals = require('webpack-node-externals');

module.exports = {
    target: "node",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../../build")
    },
    externals: [WebpackNodeExternals()]
};
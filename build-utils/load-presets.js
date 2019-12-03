const webpackMerge = require('webpack-merge');

module.exports = loadPresets = env => {
    const presets = [].concat(...[env.presets]) || [];
    const mergedPresets = presets.map(preset => require(`./presets/webpack.${preset}`));
    return webpackMerge({}, ...mergedPresets)
};



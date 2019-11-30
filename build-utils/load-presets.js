const webpackMerge = require('webpack-merge');
module.exports = loadPresets = env => {
    const presets = [].concat(...[env.presets]) || [];
    console.log('presets', presets);
    const mergedPresets = presets.map(preset => require(`./presets/webpack.${preset}`));
    console.log('mergedPresets', mergedPresets);
    return webpackMerge({}, ...mergedPresets)
};



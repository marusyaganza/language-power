const webpackMerge = require('webpack-merge');
module.exports = loadPresets = env => {
    console.log('env', env);
    const presets = env.presets ? [].concat(...[env.presets]) : [];
    console.log('presets', presets);
    const mergedPresets = presets.map(preset => require(`./presets/webpack.${preset}`));
    return webpackMerge({}, ...mergedPresets)
};



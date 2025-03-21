const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');


/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);


config.resolver.assetExts.push('mp3');
config.watchFolders = [
  ...config.watchFolders || [],
  `${__dirname}/assets`,
];


// Fix the extraNodeModules configuration with explicit path strings
config.resolver.extraNodeModules = {
  'path': require.resolve('path-browserify'),
  '@firebase/auth/react-native': path.join(__dirname, 'node_modules/@firebase/auth/dist/rn')
};

// Add 'cjs' to source extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];


module.exports = config;

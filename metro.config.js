const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add the blocklist configuration
config.resolver.blockList = [
  // Exclude Firebase Functions code from bundling
  /firebase\/functions\/.*/,
];

config.resolver.assetExts.push('mp3');
config.watchFolders = [
  ...config.watchFolders || [],
  `${__dirname}/assets`,
];

module.exports = config;

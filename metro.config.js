const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable asset resolution from the root directory
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif');
config.watchFolders = [
  ...config.watchFolders || [],
  `${__dirname}/assets`,
];

module.exports = config;

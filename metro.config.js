const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the default configuration
const config = getDefaultConfig(__dirname);

// Import module map
const { moduleMap } = require('./metro.module-mapper');

// Add the Firebase functions directory to the blacklist
config.resolver.blockList = [
  /firebase\/functions\/lib\/.*/,
  /firebase\/functions\/src\/.*/,
  /firebase\/functions\/node_modules\/.*/,
];

// Use module map for resolver
config.resolver.extraNodeModules = {
  ...moduleMap,
  // Add any other module mappings if needed
};

module.exports = config;

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

// Get the default configuration
const config = getDefaultConfig(__dirname);

// Explicitly add 'cjs' to sourceExts
config.resolver.sourceExts.push('cjs');

// Import module map
const { moduleMap } = require('./metro.module-mapper');

// Read the bundleignore file if it exists
let ignorePaths = [];
const bundleIgnorePath = path.join(__dirname, '.bundleignore');
if (fs.existsSync(bundleIgnorePath)) {
  const ignoreContent = fs.readFileSync(bundleIgnorePath, 'utf8');
  ignorePaths = ignoreContent
    .split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => new RegExp(line.trim().replace(/\//g, '\\/').replace(/\./g, '\\.')));
}

// Add the Firebase functions directory to the blacklist
config.resolver.blockList = [
  ...ignorePaths,
  /firebase\/functions\/lib\/.*/,
  /firebase\/functions\/src\/.*/,
  /firebase\/functions\/node_modules\/.*/,
  /firebase-admin\/.*/,
  /firebase-functions\/.*/,
];

// Use module map for resolver
config.resolver.extraNodeModules = {
  ...moduleMap,
  'firebase/functions': require.resolve('firebase/functions'),
  'firebase/app': require.resolve('firebase/app')
};

module.exports = config;

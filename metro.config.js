const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add mp3 to asset extensions
config.resolver.assetExts.push('mp3');

// Add additional watch folders
config.watchFolders = [
  ...config.watchFolders || [],
  `${__dirname}/assets`,
];

// Block specific modules from being included in the bundle
config.resolver.blockList = [
  /firebase\/functions\/lib\/.*/,
  /firebase-admin\/.*/,
  /firebase-functions\/v1\/.*/,
  /firebase-functions\/v2\/.*/,
  /firebase\/functions\/node_modules\/.*/
];

// Fix module resolution for Firebase
config.resolver.extraNodeModules = {
  'path': require.resolve('path-browserify'),
  '@firebase/auth/react-native': path.join(__dirname, 'node_modules/@firebase/auth/dist/rn'),
  'firebase-functions': path.join(__dirname, 'app/lib/mocks/firebase-functions.js'),
  'firebase-functions/v2': path.join(__dirname, 'app/lib/mocks/firebase-functions.js'),
  'firebase-functions/v2/https': path.join(__dirname, 'app/lib/mocks/firebase-functions.js'),
  'firebase-functions/v2/scheduler': path.join(__dirname, 'app/lib/mocks/firebase-functions.js'),
  'firebase-admin': path.join(__dirname, 'app/lib/mocks/firebase-admin.js')
};

// Add 'cjs' to source extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

module.exports = config;

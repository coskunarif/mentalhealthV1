const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Ensure we properly resolve modules
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'firebase-functions': path.resolve(__dirname, './app/lib/mocks/firebase-functions.js'),
  'firebase-admin': path.resolve(__dirname, './app/lib/mocks/firebase-admin.js')
};

// Handle resolution errors
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.includes('firebase-admin') || moduleName.includes('firebase-functions')) {
    return {
      filePath: path.resolve(__dirname, './app/lib/mocks/firebase-functions.js'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

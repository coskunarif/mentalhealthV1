const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const { moduleMap } = require('./metro.module-mapper'); // Import the generated map

const config = getDefaultConfig(__dirname);

// Remove the old extraNodeModules overrides for firebase
// config.resolver.extraNodeModules = {
//   ...config.resolver.extraNodeModules,
//   'firebase-functions': path.resolve(__dirname, './app/lib/mocks/firebase-functions.js'),
//   'firebase-admin': path.resolve(__dirname, './app/lib/mocks/firebase-admin.js')
// };

// Use the module map for resolving firebase-admin and firebase-functions
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const mappedPath = moduleMap[moduleName];
  if (mappedPath) {
    console.log(`[Metro Mapper] Mapping ${moduleName} to ${mappedPath}`); // Add logging
    return {
      filePath: mappedPath,
      type: 'sourceFile',
    };
  }
  // Fallback to default resolver for other modules
  return context.resolveRequest(context, moduleName, platform);
};

// Optional: Watch the mapper file for changes (might require Metro restart)
config.watchFolders = [
  ...config.watchFolders,
  path.resolve(__dirname) // Ensure the project root is watched
];
config.resolver.blockList = [
    ...Array.isArray(config.resolver.blockList) ? config.resolver.blockList : [],
    // Add patterns for files/folders you want Metro to ignore if needed
    /.*\/firebase\/functions\/.*/, // Example: Ignore the actual functions source
];


module.exports = config;

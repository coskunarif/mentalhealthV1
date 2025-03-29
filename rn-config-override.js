module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'],
    resolverMainFields: ['react-native', 'browser', 'main'],
    // More aggressive blacklist
    blacklistRE: new RegExp(
      '(^|\\/)' + // Start of string or a forward slash
      '(' +
        // Block any of these directories
        'firebase\\/functions\\/lib|' +
        'firebase\\/functions\\/node_modules|' +
        'firebase\\/functions\\/src|' +
        'firebase-admin|' +
        'firebase-functions' +
      ')',
      'g'
    ),
    // Add explicit module resolution
    extraNodeModules: {
      'firebase/functions': require.resolve('firebase/functions'),
      'firebase/app': require.resolve('firebase/app')
    }
  },
};

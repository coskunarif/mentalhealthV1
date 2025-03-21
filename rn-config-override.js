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
    blacklistRE: /firebase[\/\\]functions[\/\\](?!package\.json$).*/,
  },
};

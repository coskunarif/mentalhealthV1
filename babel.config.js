module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@firebase/app': '@firebase/app',
            '@firebase/functions': '@firebase/functions',
            '@firebase/auth': '@firebase/auth',
            '@firebase/firestore': '@firebase/firestore',
            '@firebase/storage': '@firebase/storage',
            '@firebase/analytics': '@firebase/analytics',
            'firebase/auth/react-native': '@firebase/auth/dist/rn',
            // Add explicit aliases for Firebase client modules
            'firebase/functions': '@firebase/functions',
            'firebase/app': '@firebase/app',
            'firebase/firestore': '@firebase/firestore',
            'firebase/storage': '@firebase/storage',
          },
        },
      ],
    ],
  };
};

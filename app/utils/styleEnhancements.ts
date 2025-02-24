import { Platform, ViewStyle, Animated, Easing } from 'react-native';

// Shadow enhancements that can be spread into existing styles
const enhanceShadow = (level: 'soft' | 'medium' = 'soft'): ViewStyle => ({
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: level === 'soft' ? 2 : 4,
      },
      shadowOpacity: level === 'soft' ? 0.15 : 0.2,
      shadowRadius: level === 'soft' ? 3 : 5,
    },
    android: {
      elevation: level === 'soft' ? 3 : 5,
    },
  }),
});

// Animation configurations that preserve existing styles
const createPressAnimation = (initialValue = new Animated.Value(1)) => {
  const pressIn = () => {
    Animated.spring(initialValue, {
      toValue: 0.98,
      useNativeDriver: true,
      damping: 20,
      mass: 1,
      stiffness: 300,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(initialValue, {
      toValue: 1,
      useNativeDriver: true,
      damping: 20,
      mass: 1,
      stiffness: 300,
    }).start();
  };

  return {
    pressIn,
    pressOut,
    transform: [{ scale: initialValue }],
  };
};

// Gradient configuration helper (for use with expo-linear-gradient)
const createGradientConfig = (baseColor: string) => ({
  colors: [
    baseColor,
    Platform.select({
      ios: `${baseColor}E6`, // 90% opacity
      android: `${baseColor}E6`,
    }),
  ],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
});

// Subtle background animation for elements
const createBackgroundAnimation = (duration = 3000) => {
  const animation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 200, // Changed to 200ms
          easing: Easing.out(Easing.ease), // Added easing
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 200, // Changed to 200ms
          easing: Easing.out(Easing.ease), // Added easing
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return {
    startAnimation,
    interpolate: {
      scale: animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.02, 1],
      }),
    },
  };
};

export default {
    enhanceShadow,
    createPressAnimation,
    createGradientConfig,
    createBackgroundAnimation
}

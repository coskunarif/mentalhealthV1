import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const colors = {
  primary: '#6C63FF',
  secondary: '#4CAF50',
  background: '#F5F7FA',
  text: '#2D3748',
  lightText: '#718096',
  white: '#FFFFFF',
};

export const shadows = {
  small: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  medium: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
};

export const enhancedStyles = StyleSheet.create({
  // Card styles with neumorphic effect
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 16,
    margin: 8,
    ...shadows.medium,
  },

  // Button styles with gradient-compatible background
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: colors.primary,
    ...shadows.small,
  },

  // Input field with subtle depth
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    ...shadows.small,
  },

  // Container with subtle gradient background
  gradientContainer: {
    flex: 1,
    width: '100%',
  },

  // Animated touchable styles
  touchableScale: {
    transform: [{ scale: 1 }], // This will be animated in the component
  },

  // Modern list item
  listItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },

  // Header styles
  header: {
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'ios' ? 44 : 20,
    paddingBottom: 10,
    paddingHorizontal: 16,
    ...shadows.medium,
  },

  // Bottom tab bar with blur effect compatibility
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    ...shadows.medium,
    height: Platform.OS === 'ios' ? 84 : 60,
    paddingBottom: Platform.OS === 'ios' ? 34 : 10,
  },
});

// Animation configurations
export const animations = {
  scale: {
    pressed: 0.95,
    default: 1,
    duration: 150,
  },
  bounce: {
    tension: 40,
    friction: 7,
  },
};

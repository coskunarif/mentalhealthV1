import { StyleSheet, Platform, StatusBar } from 'react-native';
import { theme } from './theme';

// Calculate constants
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
const APPBAR_HEIGHT = 56; // Material Design standard

export default StyleSheet.create({
  container: {
    height: STATUS_BAR_HEIGHT + APPBAR_HEIGHT,
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },
  backButtonContainer: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT + (APPBAR_HEIGHT - 48) / 2,
    left: 4,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 56, // Positioned after back button
    right: 56, // Leave space for potential right content
    height: APPBAR_HEIGHT,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.onSurface,
    letterSpacing: 0.15,
  },
  rightContentContainer: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT + (APPBAR_HEIGHT - 48) / 2,
    right: 4,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

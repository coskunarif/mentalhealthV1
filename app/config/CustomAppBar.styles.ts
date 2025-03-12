import { StyleSheet, Platform, StatusBar } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 88 : (StatusBar.currentHeight || 0) + 56,
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },
  backButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 0,
    left: 16, // Material Design standard 16dp horizontal padding
    width: 48, // Proper touch target (48x48)
    height: 56, // Standard Material toolbar height
    justifyContent: 'center',
    alignItems: 'flex-start', // Align to the start
    zIndex: 10,
  },
  rightContentContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 0,
    right: 16, // Material Design standard 16dp horizontal padding
    height: 56, // Standard height
    justifyContent: 'center',
    zIndex: 10,
  }
});

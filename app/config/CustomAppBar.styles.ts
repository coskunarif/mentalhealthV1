import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
    zIndex: 10,
  },
  backButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : (StatusBar.currentHeight || 0) + 8,
    left: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  rightContentContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : (StatusBar.currentHeight || 0) + 8,
    right: 8,
    zIndex: 10,
  }
});

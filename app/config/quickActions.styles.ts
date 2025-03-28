import { StyleSheet } from 'react-native';
import { lightTheme as theme } from './theme'; // Import lightTheme as theme

export default StyleSheet.create({
  container: {
    marginVertical: 16, // Match the other cards' vertical spacing
    // Remove any horizontal margins or padding that affect width
    padding: 0, // Remove padding and handle it inside
  },
  title: {
    marginBottom: 20,
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: '500',
  },
  fabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16, // Increased from 12
    paddingHorizontal: 16,
    paddingBottom: 20, // Added extra bottom padding
  },
  fabButton: {
    width: 72, // Increased from 64
    height: 72, // Increased from 64
    borderRadius: 36, // Half of width/height
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: theme.colors.primary,
  },
  labelContainer: {
    alignItems: 'center',
    marginTop: 14, // Increased from 10 for more spacing between button and label
  },
  labelText: {
    fontSize: 14, // Increased from 13
    fontWeight: '500',
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
});

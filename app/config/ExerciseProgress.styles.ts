import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  stepContainer: {
    marginVertical: 4,
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 16,
    width: 24, // Fixed width for proper alignment
  },
  connector: {
    width: 2,
    height: 32,
    marginTop: 4,
    marginBottom: 0,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 4, // Consistent padding
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: 0.1, // Material Design typography spec
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: 0.15, // Material Design typography spec
  },
  stepDuration: {
    fontSize: 14,
    letterSpacing: 0.25, // Material Design typography spec
  },
});

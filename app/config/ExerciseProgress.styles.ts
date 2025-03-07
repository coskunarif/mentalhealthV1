import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { 
    paddingVertical: 8
  },
  stepContainer: { 
    marginVertical: 6 // Consistent spacing
  },
  stepContent: { 
    flexDirection: 'row', 
    alignItems: 'center', // Changed from 'flex-start' for better alignment
    paddingHorizontal: 16 
  },
  iconContainer: { 
    alignItems: 'center',
    justifyContent: 'center', 
    marginRight: 12, // Reduced from 16
    width: 24,
    height: 24
  },
  connector: { 
    width: 2, 
    height: 28, // Reduced for better density
    marginTop: 4, 
    marginBottom: -4
  },
  textContainer: { 
    flex: 1, 
    paddingVertical: 2
  },
  stepNumber: { 
    fontSize: 12, 
    fontWeight: '500', 
    marginBottom: 2,
    letterSpacing: 0.1
  },
  stepTitle: { 
    fontSize: 16, 
    fontWeight: '500', 
    marginBottom: 2,
    letterSpacing: 0.15
  },
  stepDuration: { 
    fontSize: 14,
    letterSpacing: 0.25
  }
});

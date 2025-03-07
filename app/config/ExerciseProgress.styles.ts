import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { paddingVertical: 8 },
  stepContainer: { marginVertical: 4 },
  stepContent: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 16 },
  iconContainer: { alignItems: 'center', marginRight: 16 },
  connector: { width: 2, height: 32, marginTop: 4, marginBottom: -8 },
  textContainer: { flex: 1, paddingVertical: 2 },
  stepNumber: { fontSize: 12, fontWeight: '500', marginBottom: 2 },
  stepTitle: { fontSize: 16, fontWeight: '500', marginBottom: 2 },
  stepDuration: { fontSize: 12 },
});

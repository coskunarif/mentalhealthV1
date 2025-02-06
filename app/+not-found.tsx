import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from './config/styles';

export default function NotFoundScreen() {
  return (
    <View style={styles.styles.layout.container}>
      <View style={styles.styles.layout.content}>
        <Text style={styles.styles.text.heading1}>Page Not Found</Text>
        
        <Text style={[styles.styles.text.body, { marginTop: 16 }]}>
          We couldn't find the page you're looking for. Please check the URL or return to home.
        </Text>

        <Link href="/tabs/home" asChild>
          <Button
            mode="contained"
            style={[styles.styles.button.primary, { marginTop: 24 }]}
          >
            Return to Home
          </Button>
        </Link>
      </View>
    </View>
  );
}

import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from './config/styles';

export default function NotFoundScreen() {
  return (
    <View style={styles.layout_container}>
      <View style={styles.layout_content}>
        <Text style={styles.text_heading1}>Page Not Found</Text>
        <Text style={[styles.text_body, styles.notFound_text]}>
          We couldn't find the page you're looking for. Please check the URL or return to home.
        </Text>

        <Link href="/tabs/home" asChild>
          <Button
            mode="contained"
            style={[styles.button_primary, styles.notFound_button]}
          >
            Return to Home
          </Button>
        </Link>
      </View>
    </View>
  );
}

import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { layoutStyles, typographyStyles, buttonStyles, miscStyles } from './config';

export default function NotFoundScreen() {
  return (
    <View style={layoutStyles.layout_container}>
      <View style={layoutStyles.layout_content}>
        <Text style={typographyStyles.text_heading1}>Page Not Found</Text>
        <Text style={[typographyStyles.text_body, miscStyles.notFound_text]}>
          We couldn't find the page you're looking for. Please check the URL or return to home.
        </Text>
        <Link href="/tabs/home" asChild>
          <Button mode="contained" style={buttonStyles.button_primary}>
            Return to Home
          </Button>
        </Link>
      </View>
    </View>
  );
}

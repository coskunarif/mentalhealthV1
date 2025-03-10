import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { LegalLinks } from './LegalLinks';
import { useRouter } from 'expo-router';
import { layoutStyles, typographyStyles } from '../config';
import { theme } from '../config/theme';
import { CustomAppBar } from './CustomAppBar';

export default function LegalScreen() {
  const router = useRouter();
  return (
    <View style={layoutStyles.layout_container}>
      <CustomAppBar 
        title="Legal & Privacy" 
        subtitle="Review our policies and terms governing your usage."
      />
      <ScrollView
        contentContainerStyle={[
          layoutStyles.layout_content,
          { paddingVertical: theme.spacing.small },
        ]}
      >
        <LegalLinks />
      </ScrollView>
    </View>
  );
}

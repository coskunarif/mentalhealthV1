import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { LegalLinks } from './LegalLinks';
import { useRouter } from 'expo-router';
import globalStyles from '../config/styles';
import { theme } from '../config/theme';
import { CustomAppBar } from './CustomAppBar';

export default function LegalScreen() {
  const router = useRouter();

  return (
    <View style={globalStyles.layout_container}>
      <CustomAppBar title="Legal & Privacy" />

      <ScrollView
        contentContainerStyle={[
          globalStyles.layout_content,
          { paddingVertical: theme.spacing.small }
        ]}
      >
        <Text style={[
          globalStyles.text_subtitle,
          { marginBottom: theme.spacing.small }
        ]}>
          Review our policies and terms governing your usage.
        </Text>
        <LegalLinks />
      </ScrollView>
    </View>
  );
}

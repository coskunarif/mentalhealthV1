import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { LegalLinks } from './LegalLinks';
import { useRouter } from 'expo-router';
import globalStyles from '../config/styles';
import { theme } from '../config/theme';

export default function LegalScreen() {
  const router = useRouter();

  return (
    <View style={globalStyles.layout_container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Legal & Privacy" />
      </Appbar.Header>

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

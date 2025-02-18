import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { HelpCenterCard } from './HelpCenterCard';
import { useRouter } from 'expo-router';
import globalStyles from '../config/styles';
import { theme } from '../config/theme';

export default function HelpCenterScreen() {
  const router = useRouter();

  const handleContactSupport = () => {
    // TODO: Implement live chat functionality
    console.log('Opening live chat');
  };

  return (
    <View style={globalStyles.layout_container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Help Center" />
      </Appbar.Header>

      <ScrollView 
        contentContainerStyle={[
          globalStyles.layout_content,
          { paddingVertical: theme.spacing.small }
        ]}
      >
        <Text style={[globalStyles.text_subtitle, { marginBottom: theme.spacing.small }]}>
          Find answers to FAQs or reach out to our support team.
        </Text>
        <HelpCenterCard onContactSupport={handleContactSupport} />
      </ScrollView>
    </View>
  );
}

import React from 'react';
import { View, ScrollView } from 'react-native';
import { HelpCenterCard } from './HelpCenterCard';
import { useRouter } from 'expo-router';
import { layoutStyles } from '../config';
import { theme } from '../config/theme';
import { CustomAppBar } from './CustomAppBar';

export default function HelpCenterScreen() {
  const router = useRouter();

  const handleContactSupport = () => {
    console.log('Opening live chat');
  };

  return (
    <View style={layoutStyles.layout_container}>
      <CustomAppBar 
        title="Help Center" 
        subtitle="Find answers to FAQs or reach out to our support team."
      />
      <ScrollView
        contentContainerStyle={[
          layoutStyles.layout_content,
          { paddingVertical: theme.spacing.small },
        ]}
      >
        <HelpCenterCard onContactSupport={handleContactSupport} />
      </ScrollView>
    </View>
  );
}

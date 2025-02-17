import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { IconButton, Text, List, Button, Surface, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { theme } from '../config/theme';
import globalStyles from '../config/styles';

export default function ManageSubscriptionScreen() {
  const router = useRouter();

  return (
    <View style={globalStyles.layout_container}>
      <Surface style={globalStyles.header_surface} elevation={2}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text style={globalStyles.text_heading1}>Manage Subscription</Text>
      </Surface>
      <ScrollView contentContainerStyle={globalStyles.layout_content}>
        <Text style={globalStyles.text_subtitle}>
          View and manage your subscription plan and billing details.
        </Text>
        {/* Current Plan */}
        <Surface style={componentStyles.sectionCard}>
          <Text style={globalStyles.text_heading2}>Current Plan</Text>
          <List.Item
            title="Premium Plan"
            description="$9.99/month"
            left={props => <List.Icon {...props} icon="star" />}
          />
        </Surface>

        {/* Available Plans */}
        <Surface style={componentStyles.sectionCard}>
          <Text style={globalStyles.text_heading2}>Available Plans</Text>
          <List.Item
            title="Monthly Plan"
            description="$9.99/month"
            left={props => <List.Icon {...props} icon="calendar-month" />}
            right={() => <Button mode="outlined">Select</Button>}
          />
          <List.Item
            title="Annual Plan"
            description="$99.99/year (Save 17%)"
            left={props => <List.Icon {...props} icon="calendar" />}
            right={() => <Button mode="outlined">Select</Button>}
          />
        </Surface>

        {/* Billing Information */}
        <Surface style={componentStyles.sectionCard}>
          <Text style={globalStyles.text_heading2}>Billing Information</Text>
          <List.Item
            title="Next billing date"
            description="March 15, 2024"
            left={props => <List.Icon {...props} icon="clock-outline" />}
          />
          <List.Item
            title="Payment method"
            description="•••• 4242"
            left={props => <List.Icon {...props} icon="credit-card" />}
            onPress={() => console.log('Update payment method')}
          />
        </Surface>

        {/* Actions */}
        <Button 
          mode="outlined" 
          onPress={() => console.log('Cancel subscription')}
          style={componentStyles.cancelButton}
        >
          Cancel Subscription
        </Button>
      </ScrollView>
    </View>
  );
}

const componentStyles = StyleSheet.create({
  sectionCard: {
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium * 2,
    borderRadius: theme.shape.borderRadius * 2,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  cancelButton: {
    marginTop: theme.spacing.medium,
  },
});

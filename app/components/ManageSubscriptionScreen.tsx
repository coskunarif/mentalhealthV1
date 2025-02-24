import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Text, List, Button, Surface, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { theme } from '../config/theme';
import globalStyles from '../config/styles';
import { CustomAppBar } from './CustomAppBar';

export default function ManageSubscriptionScreen() {
  const router = useRouter();

  return (
    <View style={globalStyles.layout_container}>
      <CustomAppBar title="Subscription" />

      <ScrollView
        contentContainerStyle={[
          globalStyles.layout_content,
          { paddingVertical: theme.spacing.small }
        ]}
      >
        <Text style={[globalStyles.text_subtitle, { marginBottom: theme.spacing.small }]}>
          View and manage your subscription plan and billing details.
        </Text>

        <Surface style={styles.container} elevation={1}>
          {/* Current Plan */}
          <Text style={[globalStyles.text_heading3, styles.sectionTitle]}>Current Plan</Text>
          <List.Item
            title="Premium Plan"
            description="$9.99/month"
            left={props => <List.Icon {...props} icon="star" />}
          />

          <Divider style={styles.divider} />

          {/* Available Plans */}
          <Text style={[globalStyles.text_heading3, styles.sectionTitle]}>Available Plans</Text>
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

          <Divider style={styles.divider} />

          {/* Billing Information */}
          <Text style={[globalStyles.text_heading3, styles.sectionTitle]}>Billing Information</Text>
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

        <Button
          mode="outlined"
          onPress={() => console.log('Cancel subscription')}
          style={styles.cancelButton}
        >
          Cancel Subscription
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create<{
  container: ViewStyle;
  sectionTitle: TextStyle;
  divider: ViewStyle;
  cancelButton: ViewStyle;
}>({
  container: {
    marginHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing.medium,
  },
  sectionTitle: {
    ...theme.fonts.titleSmall,
    color: theme.colors.onSurface,
    marginTop: theme.spacing.small,
    fontWeight: '500',
  },
  divider: {
    marginVertical: theme.spacing.small,
    backgroundColor: theme.colors.surfaceVariant,
    opacity: 0.7,
  },
  cancelButton: {
    marginTop: theme.spacing.small,
    marginHorizontal: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius / 2,
  },
});

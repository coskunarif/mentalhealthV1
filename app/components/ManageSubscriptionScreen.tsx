import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, List, Button, Surface, Divider, Snackbar, Dialog, Portal } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { CARD_ELEVATION } from '../config/theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { layoutStyles, typographyStyles, cardStyles, buttonStyles } from '../config';
import styles from '../config/ManageSubscriptionScreen.styles';
import { ScreenLayout } from './ScreenLayout';

export default function ManageSubscriptionScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState('Premium Plan');
  const [currentPrice, setCurrentPrice] = useState('$9.99/month');
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const billingInfo = {
    nextBillingDate: 'March 15, 2024',
    paymentMethod: '•••• 4242',
  };

  const handleSelectPlan = async (plan: string, price: string) => {
    if (plan === currentPlan) {
      setSnackbar({ visible: true, message: `You're already subscribed to ${plan}` });
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentPlan(plan);
      setCurrentPrice(price);
      setSnackbar({ visible: true, message: `Successfully switched to ${plan}` });
    } catch (error) {
      setSnackbar({ visible: true, message: 'Failed to change plan. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentPlan('No active plan');
      setCurrentPrice('');
      setShowCancelDialog(false);
      setSnackbar({ visible: true, message: 'Your subscription has been cancelled' });
    } catch (error) {
      setSnackbar({ visible: true, message: 'Failed to cancel subscription. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenLayout
      title="Subscription"
      subtitle="View and manage your subscription plan and billing details."
    >
      <ScrollView contentContainerStyle={[layoutStyles.layout_content, { paddingVertical: theme.spacing.small }]}>
        <Surface style={styles.container} elevation={CARD_ELEVATION.DEFAULT}>
          <Text style={[typographyStyles.text_heading3, styles.sectionTitle]}>Current Plan</Text>
          <List.Item
            title={currentPlan}
            description={currentPrice}
            left={(props) => <List.Icon {...props} icon="star" />}
          />
          <Divider style={styles.divider} />
          <Text style={[typographyStyles.text_heading3, styles.sectionTitle]}>Available Plans</Text>
          <List.Item
            title="Monthly Plan"
            description="$9.99/month"
            left={(props) => <List.Icon {...props} icon="calendar" />}
            right={() => (
              <Button
                mode="contained"
                style={styles.selectButton}
                onPress={() => handleSelectPlan('Monthly Plan', '$9.99/month')}
                loading={isLoading && currentPlan !== 'Monthly Plan'}
                disabled={isLoading || currentPlan === 'Monthly Plan'}
              >
                {currentPlan === 'Monthly Plan' ? 'Current' : 'Select'}
              </Button>
            )}
          />
          <List.Item
            title="Annual Plan"
            description="$99.99/year (Save 17%)"
            left={(props) => <List.Icon {...props} icon="calendar" />}
            titleStyle={styles.planTitle}
            descriptionStyle={styles.planDescription}
            right={() => (
              <Button
                mode="contained"
                style={styles.selectButton}
                onPress={() => handleSelectPlan('Annual Plan', '$99.99/year')}
                loading={isLoading && currentPlan !== 'Annual Plan'}
                disabled={isLoading || currentPlan === 'Annual Plan'}
              >
                {currentPlan === 'Annual Plan' ? 'Current' : 'Select'}
              </Button>
            )}
          />
          <Divider style={styles.divider} />
          <Text style={[typographyStyles.text_heading3, styles.sectionTitle]}>Billing Information</Text>
          <List.Item
            title="Next billing date"
            description={billingInfo.nextBillingDate}
            left={(props) => <List.Icon {...props} icon="clock-outline" />}
          />
          <List.Item
            title="Payment method"
            description={billingInfo.paymentMethod}
            left={(props) => <List.Icon {...props} icon="credit-card" />}
          />
        </Surface>
        <Button
          mode="outlined"
          onPress={() => setShowCancelDialog(true)}
          style={styles.cancelButton}
          disabled={isLoading || currentPlan === 'No active plan'}
        >
          Cancel Subscription
        </Button>
      </ScrollView>
      <Portal>
        <Dialog visible={showCancelDialog} onDismiss={() => setShowCancelDialog(false)}>
          <Dialog.Title>Cancel Subscription</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowCancelDialog(false)}>No, Keep It</Button>
            <Button onPress={handleCancelSubscription} loading={isLoading} disabled={isLoading}>
              Yes, Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={3000}
      >
        {snackbar.message}
      </Snackbar>
    </ScreenLayout>
  );
}

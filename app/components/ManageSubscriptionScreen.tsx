import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, List, Button, Surface, Divider, Snackbar, Dialog, Portal, ActivityIndicator } from 'react-native-paper'; // Added ActivityIndicator
import { useRouter } from 'expo-router';
import { CARD_ELEVATION } from '../config/theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { layoutStyles, typographyStyles, cardStyles, buttonStyles } from '../config';
import styles from '../config/ManageSubscriptionScreen.styles';
import { ScreenLayout } from './ScreenLayout';
import { UserService } from '../services/user.service';
import { useAuth } from '../context/auth';

export default function ManageSubscriptionScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.uid;
  // Initialize state to null and add loading/error states
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<string | null>(null);
  const [isSubLoading, setIsSubLoading] = useState(true); // Loading state for subscription fetch
  const [fetchError, setFetchError] = useState<string | null>(null); // Error state for fetch
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false); // Loading state for actions (select/cancel)

  const billingInfo = { // Keep this as static for now, fetch if needed later
    nextBillingDate: 'March 15, 2024',
    paymentMethod: '•••• 4242',
  };

  // Update useEffect to handle loading and error states
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!userId) {
        setIsSubLoading(false);
        setFetchError("User not found.");
        setCurrentPlan('N/A');
        setCurrentPrice('');
        return;
      }
      setIsSubLoading(true);
      setFetchError(null);
      try {
        const status = await UserService.getSubscriptionStatus(userId);
        setCurrentPlan(status.plan);
        setCurrentPrice(status.price);
      } catch (error: any) {
        console.error('Error fetching subscription status:', error);
        setFetchError(error.message || 'Failed to load subscription details.');
        setCurrentPlan('Error'); // Indicate error state
        setCurrentPrice('');
      } finally {
        setIsSubLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [userId]);

  const handleSelectPlan = async (plan: string, price: string) => {
    if (!userId) return;
    if (plan === currentPlan) {
      setSnackbar({ visible: true, message: `You're already subscribed to ${plan}` });
      return;
    }
    setIsActionLoading(true); // Use action loading state
    try {
      await UserService.updateSubscription(userId, { plan, price });
      setCurrentPlan(plan);
      setCurrentPrice(price);
      setSnackbar({ visible: true, message: `Successfully switched to ${plan}` });
    } catch (error) {
      setSnackbar({ visible: true, message: 'Failed to change plan. Please try again.' });
    } finally {
      setIsActionLoading(false); // Use action loading state
    }
  };

  const handleCancelSubscription = async () => {
    if (!userId) return;
    setIsActionLoading(true); // Use action loading state
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentPlan('No active plan');
      setCurrentPrice('');
      setShowCancelDialog(false);
      setSnackbar({ visible: true, message: 'Your subscription has been cancelled' });
    } catch (error) {
      setSnackbar({ visible: true, message: 'Failed to cancel subscription. Please try again.' });
    } finally {
      setIsActionLoading(false); // Use action loading state
    }
  };

  // Display loading indicator while fetching initial status
  if (isSubLoading) {
    return (
      <ScreenLayout title="Subscription">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Loading subscription...</Text>
        </View>
      </ScreenLayout>
    );
  }

  // Display error message if fetch failed
  if (fetchError) {
     return (
      <ScreenLayout title="Subscription">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <Text style={{ color: theme.colors.error, textAlign: 'center' }}>{fetchError}</Text>
          {/* Optionally add a retry button */}
        </View>
      </ScreenLayout>
     );
  }

  return (
    <ScreenLayout
      title="Subscription"
      subtitle="View and manage your subscription plan and billing details."
    >
      <ScrollView contentContainerStyle={[layoutStyles.layout_content, { paddingVertical: theme.spacing.small }]}>
        <Surface style={styles.container} elevation={CARD_ELEVATION.DEFAULT}>
          <Text style={[typographyStyles.text_heading3, styles.sectionTitle]}>Current Plan</Text>
          <List.Item
            title={currentPlan || 'N/A'} // Handle null state
            description={currentPrice || ''} // Handle null state
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
                loading={isActionLoading && currentPlan !== 'Monthly Plan'} // Use action loading state
                disabled={isActionLoading || currentPlan === 'Monthly Plan'} // Use action loading state
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
                loading={isActionLoading && currentPlan !== 'Annual Plan'} // Use action loading state
                disabled={isActionLoading || currentPlan === 'Annual Plan'} // Use action loading state
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
          disabled={isActionLoading || !currentPlan || currentPlan === 'No active plan' || currentPlan === 'Error' || currentPlan === 'N/A'} // Disable if no plan or loading
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
            <Button onPress={() => setShowCancelDialog(false)} disabled={isActionLoading}>No, Keep It</Button>
            <Button onPress={handleCancelSubscription} loading={isActionLoading} disabled={isActionLoading}>
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

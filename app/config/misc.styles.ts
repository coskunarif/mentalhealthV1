import { StyleSheet } from 'react-native';
import { theme } from './theme';
import type { ViewStyle, TextStyle } from 'react-native';

const miscStyles = StyleSheet.create({
  // Home & Sections
  screen_home_container: { flex: 1, backgroundColor: theme.colors.background } as ViewStyle,
  home_sectionSurface: {
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  } as ViewStyle,
  home_sectionTitle: {
    marginBottom: 12,
    color: theme.colors.onSurface,
    ...theme.fonts.headlineMedium,
  } as TextStyle,
  // Not Found
  notFound_text: { marginTop: 16, ...theme.fonts.bodyMedium } as TextStyle,
  notFound_button: { marginTop: 24 } as ViewStyle,
  // Profile
  profile_header: {
    paddingVertical: theme.spacing.large,
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    marginBottom: theme.spacing.small,
  } as ViewStyle,
  profile_headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  profile_headerText: { marginLeft: theme.spacing.medium, flex: 1 } as ViewStyle,
  profile_name: { color: theme.colors.onSurface } as TextStyle,
  profile_email: { color: theme.colors.onSurfaceVariant } as TextStyle,
  profile_mainSection: {
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    borderRadius: 12,
    overflow: 'hidden',
  } as ViewStyle,
  profile_sectionTitle: {
    marginLeft: theme.spacing.medium,
    marginTop: theme.spacing.small,
    marginBottom: theme.spacing.small,
    color: theme.colors.onSurface,
    ...theme.fonts.headlineSmall,
  } as TextStyle,
  profile_subscriptionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.small,
  } as ViewStyle,
  profile_statusLabel: { color: theme.colors.onSurfaceVariant } as TextStyle,
  profile_statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  } as ViewStyle,
  profile_statusText: {
    fontSize: 14,
    fontWeight: '500',
  } as TextStyle,
  profile_statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
  } as ViewStyle,
  profile_statItem: { alignItems: 'center' } as ViewStyle,
  profile_statNumber: {
    ...theme.fonts.titleLarge,
    color: theme.colors.onSurface,
    fontWeight: 'bold',
  } as TextStyle,
  profile_statLabel: {
    ...theme.fonts.labelMedium,
    color: theme.colors.onSurfaceVariant,
    marginTop: 4,
  } as TextStyle,
  // Recent Activities
  recentActivities_container: { marginBottom: 24 } as ViewStyle,
  recentActivities_item: {
    padding: theme.spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  recentActivities_itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  } as ViewStyle,
  // Mood (common container for Mood screens)
  mood_gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.small,
    gap: 12,
  } as ViewStyle,
});

export default miscStyles;

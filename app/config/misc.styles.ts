import { StyleSheet } from 'react-native';
import { theme } from './theme';
import type { ViewStyle, TextStyle, View } from 'react-native';

const miscStyles = StyleSheet.create({
    list_item: {
    paddingVertical: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
  } as ViewStyle,

  // Home & Sections
  screen_home_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
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
    textAlign: 'left',
    paddingLeft: 2, // Small padding for visual alignment
  } as TextStyle,

  // Not Found
  notFound_text: {
    marginTop: 16,
    ...theme.fonts.bodyMedium,
  } as TextStyle,
  notFound_button: {
    marginTop: 24,
  } as ViewStyle,

  // Profile
  profile_header: {
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    marginBottom: theme.spacing.medium,
  } as ViewStyle,
  profile_headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  profile_avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.medium,
  } as ViewStyle,
  profile_headerText: {
    flex: 1,
  } as ViewStyle,
  profile_name: {
    color: theme.colors.onSurface,
  } as TextStyle,
  profile_email: {
    color: theme.colors.onSurfaceVariant,
    ...theme.fonts.bodyMedium,
  } as TextStyle,

  // Each card-like section under the header
  profile_sectionCard: {
    marginHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
  } as ViewStyle,
  profile_sectionTitle: {
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
  profile_statusLabel: {
    color: theme.colors.onSurfaceVariant,
  } as TextStyle,
profile_statusBadge: {
    paddingHorizontal: theme.spacing.small + 4,
    paddingVertical: theme.spacing.tiny,
    borderRadius: 16,
    marginLeft: theme.spacing.small,
  } as ViewStyle,
  profile_statusText: {
    fontSize: 14,
    fontWeight: '500',
  } as TextStyle,

profile_statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.medium,
    marginTop: theme.spacing.small,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.shape.borderRadius,
    marginHorizontal: theme.spacing.small,
  } as ViewStyle,
  profile_statItem: {
    alignItems: 'center',
    padding: theme.spacing.small,
  } as ViewStyle,
  profile_statNumber: {
    ...theme.fonts.headlineSmall,
    color: theme.colors.primary,
    fontWeight: '600',
  } as TextStyle,
  profile_statLabel: {
    ...theme.fonts.labelMedium,
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.tiny,
  } as TextStyle,

  // Recent Activities
  recentActivities_container: {
    marginBottom: 24,
  } as ViewStyle,
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

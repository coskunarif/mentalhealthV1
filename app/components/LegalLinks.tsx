import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, List } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { theme } from '../config/theme';
import { miscStyles } from '../config';

export const LegalLinks: React.FC = () => {
  const router = useRouter();
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Legal Information</Title>
        <List.Section>
          <List.Item
            title="Privacy Policy"
            left={(props) => <List.Icon {...props} icon="shield-account" color={theme.colors.primary}/>}
            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.onSurfaceVariant} />}
            onPress={() => router.push('/legal/privacy')}
            titleStyle={{...styles.linkTitle, ...theme.fonts.bodyLarge}}
            style={miscStyles.list_item}
            rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
          />
          <List.Item
            title="Terms of Service"
            left={(props) => <List.Icon {...props} icon="file-document" color={theme.colors.primary}/>}
            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.onSurfaceVariant} />}
            onPress={() => router.push('/legal/terms')}
            titleStyle={{...styles.linkTitle, ...theme.fonts.bodyLarge}}
            style={miscStyles.list_item}
            rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
          />
        </List.Section>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: theme.spacing.medium,
    padding: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
    elevation: 1,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    marginBottom: theme.spacing.small,
    color: theme.colors.onSurface,
    ...theme.fonts.titleMedium,
    fontWeight: '500',
  },
  linkTitle: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
    lineHeight: theme.fonts.bodyLarge.lineHeight * 0.9,
  },
});

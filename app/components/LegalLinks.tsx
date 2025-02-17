import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, List } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { theme } from '../config/theme';

export const LegalLinks: React.FC = () => {
  const router = useRouter();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Legal Information</Title>

        <List.Section>
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/legal/privacy')}
            titleStyle={styles.linkTitle}
          />
          
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/legal/terms')}
            titleStyle={styles.linkTitle}
          />
        </List.Section>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: theme.spacing.medium,
    padding: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    marginBottom: theme.spacing.medium,
    color: theme.colors.primary,
    fontSize: theme.fonts.headlineMedium.fontSize,
    fontFamily: theme.fonts.headlineMedium.fontFamily,
    fontWeight: theme.fonts.headlineMedium.fontWeight,
  },
  linkTitle: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  },
});

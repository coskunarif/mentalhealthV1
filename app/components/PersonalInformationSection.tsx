import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Divider } from 'react-native-paper';
import type { PersonalInformation } from '../types/personalInformation';
import { theme } from '../config/theme';

interface PersonalInformationSectionProps {
  info: PersonalInformation;
}

export const PersonalInformationSection: React.FC<PersonalInformationSectionProps> = ({ info }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Personal Information</Title>
        
        <View style={styles.infoRow}>
          <Paragraph style={styles.label}>Name:</Paragraph>
          <Paragraph style={styles.value}>{info.name}</Paragraph>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.infoRow}>
          <Paragraph style={styles.label}>Email:</Paragraph>
          <Paragraph style={styles.value}>{info.email}</Paragraph>
        </View>
        {info.phoneNumber && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Phone Number:</Paragraph>
              <Paragraph style={styles.value}>{info.phoneNumber}</Paragraph>
            </View>
            <Divider style={styles.divider} />
          </>
        )}

        {info.dateOfBirth && (
          <View style={styles.infoRow}>
            <Paragraph style={styles.label}>Date of Birth:</Paragraph>
            <Paragraph style={styles.value}>{info.dateOfBirth}</Paragraph>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    marginBottom: theme.spacing.small,
    color: theme.colors.onSurface,
    fontSize: theme.fonts.headlineMedium.fontSize,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.tiny,
  },
  label: {
    fontWeight: 'bold',
    color: theme.colors.onSurfaceVariant,
  },
  value: {
    color: theme.colors.onSurface,
  },
  divider: {
    marginVertical: theme.spacing.tiny,
  },
});

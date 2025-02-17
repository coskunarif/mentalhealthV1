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
    marginTop: theme.spacing.small, // Reduced top margin since it's first in ScrollView
    padding: theme.spacing.medium,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.small,
  },
  label: {
    fontSize: theme.fonts.bodyMedium.fontSize,
    fontFamily: theme.fonts.bodyMedium.fontFamily,
    color: theme.colors.onSurfaceVariant,
  },
  value: {
    fontSize: theme.fonts.bodyLarge.fontSize,
    fontFamily: theme.fonts.bodyLarge.fontFamily,
    color: theme.colors.onSurface,
  },
  divider: {
    backgroundColor: theme.colors.outlineVariant,
  },
});

import React, { useState } from 'react';
import { StyleSheet, Linking, ViewStyle, TextStyle } from 'react-native';
import { Surface, List, Button, Text, Divider } from 'react-native-paper';
import { theme } from '../config/theme';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How do I track my daily mood?',
    answer: 'Use the Mood Tracker on the home screen to log your daily emotional state. You can select from various moods and add notes about your feelings.',
  },
  {
    question: 'Can I customize my meditation reminders?',
    answer: 'Yes! Go to Notification Preferences in your Profile settings to set up custom meditation reminders that work best for your schedule.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'To cancel your subscription, go to Profile > Premium Subscription > Manage Subscription. Follow the prompts to complete the cancellation.',
  },
  {
    question: 'Is my data private and secure?',
    answer: 'Yes, we take your privacy seriously. All your data is encrypted and stored securely. You can review our Privacy Policy for more details.',
  },
];

const supportEmail = 'support@mentalhealth.app';
const supportPhone = '+1 (555) 123-4567';

interface HelpCenterCardProps {
  onContactSupport?: () => void;
}

export const HelpCenterCard: React.FC<HelpCenterCardProps> = ({ onContactSupport }) => {
  const [expandedId, setExpandedId] = useState<string | false>(false);

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? false : id);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${supportEmail}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${supportPhone}`);
  };

  return (
    <Surface style={styles.container} elevation={1}>
      <List.Section>
        <List.Subheader style={styles.subheader}>Frequently Asked Questions</List.Subheader>
        {faqs.map((faq, index) => (
          <React.Fragment key={index}>
            <List.Accordion
              title={faq.question}
              expanded={expandedId === `faq-${index}`}
              onPress={() => handleExpand(`faq-${index}`)}
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
            >
              <Text style={styles.answerText}>{faq.answer}</Text>
            </List.Accordion>
          </React.Fragment>
        ))}
      </List.Section>

      <Divider style={styles.sectionDivider} />

      <List.Section>
        <List.Subheader style={styles.subheader}>Contact Support</List.Subheader>
        <List.Item
          title="Email Support"
          description={supportEmail}
          left={props => <List.Icon {...props} icon="email" />}
          onPress={handleEmailPress}
          titleStyle={styles.contactTitle}
          descriptionStyle={styles.contactDescription}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Phone Support"
          description={supportPhone}
          left={props => <List.Icon {...props} icon="phone" />}
          onPress={handlePhonePress}
          titleStyle={styles.contactTitle}
          descriptionStyle={styles.contactDescription}
        />
      </List.Section>

      <Button
        mode="contained"
        onPress={onContactSupport}
        icon="message"
        style={styles.chatButton}
      >
        Start Live Chat
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  subheader: TextStyle;
  accordion: ViewStyle;
  accordionTitle: TextStyle;
  answerText: TextStyle;
  contactTitle: TextStyle;
  contactDescription: TextStyle;
  divider: ViewStyle;
  sectionDivider: ViewStyle;
  chatButton: ViewStyle;
}>({
  container: {
    marginHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
    elevation: 1,
  },
  subheader: {
    ...theme.fonts.titleMedium,
    color: theme.colors.primary,
    paddingTop: theme.spacing.small,
  },
  accordion: {
    backgroundColor: 'transparent',
    paddingHorizontal: theme.spacing.small,
  },
  accordionTitle: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  answerText: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    padding: theme.spacing.small,
    paddingTop: 0,
    lineHeight: theme.fonts.bodyMedium.lineHeight * 0.9,
  },
  contactTitle: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  },
  contactDescription: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.primary,
  },
  divider: {
    backgroundColor: theme.colors.surfaceVariant,
  },
  sectionDivider: {
    backgroundColor: theme.colors.surfaceVariant,
    marginVertical: theme.spacing.medium,
  },
  chatButton: {
    margin: theme.spacing.medium,
  },
});

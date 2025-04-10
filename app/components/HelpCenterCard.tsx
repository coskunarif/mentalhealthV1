import React, { useState } from 'react';
import { Linking } from 'react-native';
import { Surface, List, Button, Text, Divider } from 'react-native-paper';
import { CARD_ELEVATION } from '../config/theme';
import { useAppTheme } from '../hooks/useAppTheme';
import styles from '../config/HelpCenterCard.styles';
import { miscStyles } from '../config';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How do I track my daily mood?',
    answer:
      'Use the Mood Tracker on the home screen to log your daily emotional state. You can select from various moods and add notes about your feelings.',
  },
  {
    question: 'Can I customize my exercise reminders?', // Updated question
    answer:
      'Yes! Go to Notification Preferences in your Profile settings to set up custom exercise reminders that work best for your schedule.', // Updated answer
  },
  {
    question: 'How do I cancel my subscription?',
    answer:
      'To cancel your subscription, go to Profile > Premium Subscription > Manage Subscription. Follow the prompts to complete the cancellation.',
  },
  {
    question: 'Is my data private and secure?',
    answer:
      'Yes, we take your privacy seriously. All your data is encrypted and stored securely. You can review our Privacy Policy for more details.',
  },
];

const supportEmail = 'support@mentalhealth.app';
const supportPhone = '+1 (555) 123-4567';

interface HelpCenterCardProps {
  onContactSupport?: () => void;
}

export const HelpCenterCard: React.FC<HelpCenterCardProps> = ({
  onContactSupport,
}) => {
  const theme = useAppTheme();
  const [expandedId, setExpandedId] = useState<string | false>(false);

  const handleExpand = (id: string) => setExpandedId(expandedId === id ? false : id);
  const handleEmailPress = () => Linking.openURL(`mailto:${supportEmail}`);
  const handlePhonePress = () => Linking.openURL(`tel:${supportPhone}`);

  return (
    <Surface style={styles.container} elevation={CARD_ELEVATION.DEFAULT}>
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
          left={(props) => <List.Icon {...props} icon="email" color={theme.colors.primary} />}
          onPress={handleEmailPress}
          titleStyle={{ ...styles.contactTitle, ...theme.fonts.bodyLarge }}
          descriptionStyle={styles.contactDescription}
          style={miscStyles.list_item}
          rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Phone Support"
          description={supportPhone}
          left={(props) => <List.Icon {...props} icon="phone" color={theme.colors.primary} />}
          onPress={handlePhonePress}
          titleStyle={{ ...styles.contactTitle, ...theme.fonts.bodyLarge }}
          descriptionStyle={styles.contactDescription}
          style={miscStyles.list_item}
          rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
        />
      </List.Section>
      <Button mode="contained" onPress={onContactSupport} icon="message" style={styles.chatButton}>
        Start Live Chat
      </Button>
    </Surface>
  );
};

export default HelpCenterCard;

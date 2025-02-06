import React from 'react';
import { Text } from 'react-native-paper';
import styles from '../config/styles';
import LegalLayout from '../components/LegalLayout';

export default function PrivacyPolicyScreen() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="February 1, 2025"
    >
      <Text style={[styles.styles.text.heading2, { marginBottom: 16 }]}>
        Your Privacy Matters
      </Text>

      <Text style={[styles.styles.text.body, { marginBottom: 24 }]}>
        At Mindful, we take your privacy seriously. This policy describes how we collect,
        use, and protect your personal information.
      </Text>

      <Text style={[styles.styles.text.heading3, { marginBottom: 8 }]}>
        Information We Collect
      </Text>

      <Text style={[styles.styles.text.body, { marginBottom: 24 }]}>
        We collect information that you provide directly to us, including:
        {'\n\n'}• Account information (email, name)
        {'\n'}• Usage data (meditation sessions, mood tracking)
        {'\n'}• Device information
      </Text>

      <Text style={[styles.styles.text.heading3, { marginBottom: 8 }]}>
        How We Use Your Information
      </Text>

      <Text style={[styles.styles.text.body, { marginBottom: 24 }]}>
        We use your information to:
        {'\n\n'}• Provide and improve our services
        {'\n'}• Personalize your experience
        {'\n'}• Send important updates
        {'\n'}• Analyze app usage patterns
      </Text>

      <Text style={[styles.styles.text.heading3, { marginBottom: 8 }]}>
        Data Security
      </Text>

      <Text style={styles.styles.text.body}>
        We implement appropriate security measures to protect your personal information
        from unauthorized access, alteration, or disclosure.
      </Text>
    </LegalLayout>
  );
}

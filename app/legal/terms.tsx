import React from 'react';
import { Text } from 'react-native-paper';
import { styles } from '../config/styles';
import LegalLayout from '../components/LegalLayout';

export default function TermsScreen() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="February 1, 2025"
    >
      <Text style={[styles.text.heading2, { marginBottom: 16 }]}>
        Terms and Conditions
      </Text>

      <Text style={[styles.text.body, { marginBottom: 24 }]}>
        By using Mindful, you agree to these terms. Please read them carefully.
      </Text>

      <Text style={[styles.text.heading3, { marginBottom: 8 }]}>
        Account Terms
      </Text>

      <Text style={[styles.text.body, { marginBottom: 24 }]}>
        You are responsible for:
        {'\n\n'}• Maintaining account security
        {'\n'}• All activity under your account
        {'\n'}• Providing accurate information
      </Text>

      <Text style={[styles.text.heading3, { marginBottom: 8 }]}>
        Acceptable Use
      </Text>

      <Text style={[styles.text.body, { marginBottom: 24 }]}>
        You agree not to:
        {'\n\n'}• Violate any laws
        {'\n'}• Share inappropriate content
        {'\n'}• Attempt to access unauthorized areas
        {'\n'}• Interfere with app functionality
      </Text>

      <Text style={[styles.text.heading3, { marginBottom: 8 }]}>
        Content Rights
      </Text>

      <Text style={styles.text.body}>
        All content provided through Mindful is owned by us or our licensors and is
        protected by intellectual property laws. You may not use, copy, or distribute
        this content without permission.
      </Text>
    </LegalLayout>
  );
}

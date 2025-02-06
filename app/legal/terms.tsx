import React from 'react';
import { Text } from 'react-native-paper';
import styles from '../config/styles';
import LegalLayout from '../components/LegalLayout';

export default function TermsScreen() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="February 1, 2025"
    >
      <Text style={[styles.text_heading2, styles.legal_heading]}>
        Terms and Conditions
      </Text>

      <Text style={[styles.text_body, styles.legal_body]}>
        By using Mindful, you agree to these terms. Please read them carefully.
      </Text>

      <Text style={[styles.text_heading3, styles.legal_subheading]}>
        Account Terms
      </Text>

      <Text style={[styles.text_body, styles.legal_body]}>
        You are responsible for:
        {'\n\n'}• Maintaining account security
        {'\n'}• All activity under your account
        {'\n'}• Providing accurate information
      </Text>

      <Text style={[styles.text_heading3, styles.legal_subheading]}>
        Acceptable Use
      </Text>

      <Text style={[styles.text_body, styles.legal_body]}>
        You agree not to:
        {'\n\n'}• Violate any laws
        {'\n'}• Share inappropriate content
        {'\n'}• Attempt to access unauthorized areas
        {'\n'}• Interfere with app functionality
      </Text>

      <Text style={[styles.text_heading3, styles.legal_subheading]}>
        Content Rights
      </Text>

      <Text style={styles.text_body}>
        All content provided through Mindful is owned by us or our licensors and is
        protected by intellectual property laws. You may not use, copy, or distribute
        this content without permission.
      </Text>
    </LegalLayout>
  );
}

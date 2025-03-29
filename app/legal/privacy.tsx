import React from 'react';
import { Text } from 'react-native-paper';
import LegalLayout from '../components/LegalLayout';
import typographyStyles from '../config/typography.styles';
import legalStyles from '../config/legal.styles';

export default function PrivacyPolicyScreen() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="February 1, 2025">
      <Text style={[typographyStyles.text_heading2, legalStyles.legal_heading]}>
        Your Privacy Matters
      </Text>

      <Text style={[typographyStyles.text_body, legalStyles.legal_body]}>
        At Mindful, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
      </Text>

      <Text style={[typographyStyles.text_heading3, legalStyles.legal_subheading]}>
        Information We Collect
      </Text>

      <Text style={[typographyStyles.text_body, legalStyles.legal_body]}>
        We collect information that you provide directly to us, including:{"\n\n"}• Account information (email, name){"\n"}• Usage data (exercise sessions, mood tracking){"\n"}• Device information
      </Text>

      <Text style={[typographyStyles.text_heading3, legalStyles.legal_subheading]}>
        How We Use Your Information
      </Text>

      <Text style={[typographyStyles.text_body, legalStyles.legal_body]}>
        We use your information to:{"\n\n"}• Provide and improve our services{"\n"}• Personalize your experience{"\n"}• Send important updates{"\n"}• Analyze app usage patterns
      </Text>

      <Text style={[typographyStyles.text_heading3, legalStyles.legal_subheading]}>
        Data Security
      </Text>

      <Text style={typographyStyles.text_body}>
        We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
      </Text>
    </LegalLayout>
  );
}

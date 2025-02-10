import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import styles from '../config/styles';

interface SupportFooterProps {
  showPrivacyPolicy?: boolean;
  showTerms?: boolean;
  showSupport?: boolean;
}

export default function SupportFooter({
  showPrivacyPolicy = true,
  showTerms = true,
  showSupport = true,
}: SupportFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.component_footer_container}>
      <View style={styles.component_footer_content}>
        {showPrivacyPolicy && (
          <Link href="/legal/privacy" asChild>
            <Pressable>
              <Text style={styles.component_footer_link}>Privacy Policy</Text>
            </Pressable>
          </Link>
        )}

        {showTerms && (
          <Link href="/legal/terms" asChild>
            <Pressable>
              <Text style={styles.component_footer_link}>Terms of Service</Text>
            </Pressable>
          </Link>
        )}

        {showSupport && (
          <Link href="/support" asChild>
            <Pressable>
              <Text style={styles.component_footer_link}>Support</Text>
            </Pressable>
          </Link>
        )}
      </View>
      
      <Text style={styles.component_footer_copyright}>
        {currentYear} Mindful App. All rights reserved.
      </Text>
    </View>
  );
}

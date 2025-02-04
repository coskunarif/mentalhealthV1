import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { styles } from '../config/styles';

interface SupportFooterProps {
  showPrivacyPolicy?: boolean;
  showTerms?: boolean;
  showSupport?: boolean;
}

export function SupportFooter({
  showPrivacyPolicy = true,
  showTerms = true,
  showSupport = true,
}: SupportFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.component.footer.container}>
      <View style={styles.component.footer.content}>
        {showPrivacyPolicy && (
          <Link href="/legal/privacy" asChild>
            <Pressable>
              <Text style={styles.component.footer.link}>Privacy Policy</Text>
            </Pressable>
          </Link>
        )}

        {showTerms && (
          <Link href="/legal/terms" asChild>
            <Pressable>
              <Text style={styles.component.footer.link}>Terms of Service</Text>
            </Pressable>
          </Link>
        )}

        {showSupport && (
          <Link href="/support" asChild>
            <Pressable>
              <Text style={styles.component.footer.link}>Support</Text>
            </Pressable>
          </Link>
        )}
      </View>
      
      <Text style={styles.component.footer.copyright}>
        {currentYear} Mindful App. All rights reserved.
      </Text>
    </View>
  );
}

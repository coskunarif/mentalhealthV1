import React from 'react';
import { View, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from '../config/styles';

interface WelcomeActionsProps {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export default function WelcomeActions({ fadeAnim, slideAnim }: WelcomeActionsProps) {
  return (
    <Animated.View
      style={[
        styles.styles.layout.content,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          }],
        },
      ]}
    >
      <Link href="/auth/sign-in" asChild>
        <Button
          mode="contained"
          style={styles.styles.button.primary}
        >
          Sign In
        </Button>
      </Link>

      <Link href="/auth/sign-up" asChild>
        <Button
          mode="outlined"
          style={styles.styles.button.secondary}
        >
          Create Account
        </Button>
      </Link>
    </Animated.View>
  );
}

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { globalStyles } from '../config/styles';
import { colors } from '../config/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  interactive?: boolean;
}

export const EnhancedCard: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  interactive = false,
}) => {
  const animatedScale = new Animated.Value(1);

  const handlePressIn = () => {
    if (interactive) {
      Animated.spring(animatedScale, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (interactive) {
      Animated.spring(animatedScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const content = (
    <Animated.View
      style={[
        globalStyles.card,
        style,
        { transform: [{ scale: animatedScale }] },
      ]}
    >
      {children}
    </Animated.View>
  );

  if (onPress || interactive) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

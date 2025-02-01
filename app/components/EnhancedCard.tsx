import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { enhancedStyles, shadows, colors } from '../config/enhanced-styles';

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
        styles.card,
        style,
        { transform: [{ scale: animatedScale }] },
      ]}
    >
      {children}
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  card: {
    ...enhancedStyles.card,
    backgroundColor: colors.white,
  },
});

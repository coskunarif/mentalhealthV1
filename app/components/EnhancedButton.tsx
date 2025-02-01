import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { enhancedStyles, colors, animations } from '../config/enhanced-styles';

interface ButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradient?: boolean;
}

export const EnhancedButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  gradient = true,
}) => {
  const animatedScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: animations.scale.pressed,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: animations.scale.default,
      useNativeDriver: true,
    }).start();
  };

  const buttonContent = (
    <Text style={[styles.buttonText, textStyle]}>
      {title}
    </Text>
  );

  return (
    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        style={[styles.container, style]}
      >
        {gradient ? (
          <LinearGradient
            colors={[colors.primary, '#8B85FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            {buttonContent}
          </LinearGradient>
        ) : (
          buttonContent
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...enhancedStyles.button,
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

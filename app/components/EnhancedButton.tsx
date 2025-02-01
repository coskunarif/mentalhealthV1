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
import { globalStyles } from '../config/styles';
import { colors } from '../config/colors';

interface ButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary';
}

export const EnhancedButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  variant = 'primary',
}) => {
  const animatedScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          globalStyles.button,
          variant === 'primary' ? globalStyles.buttonPrimary : globalStyles.buttonSecondary,
          style,
          { transform: [{ scale: animatedScale }] },
        ]}
      >
        <Text
          style={[
            globalStyles.buttonLabel,
            { color: variant === 'primary' ? colors.onPrimary : colors.primary },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

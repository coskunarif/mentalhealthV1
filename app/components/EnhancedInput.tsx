import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Animated,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { enhancedStyles, colors } from '../config/enhanced-styles';

interface EnhancedInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

export const EnhancedInput: React.FC<EnhancedInputProps> = ({
  containerStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedScale = new Animated.Value(1);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(animatedScale, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        { transform: [{ scale: animatedScale }] },
      ]}
    >
      <TextInput
        {...props}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={colors.lightText}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...enhancedStyles.input,
    backgroundColor: 'transparent',
  },
  input: {
    color: colors.text,
    fontSize: 16,
    padding: 0,
  },
  inputFocused: {
    color: colors.primary,
  },
});

import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Animated,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { globalStyles } from '../config/styles';
import { colors } from '../config/colors';

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
          globalStyles.input,
          styles.input,
          isFocused && styles.inputFocused,
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={colors.primary400}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.surface,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceVariant,
  },
});

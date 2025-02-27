import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import buttonStyles from '../config/button.styles';

type ButtonStyle = StyleProp<ViewStyle>;

interface EnhancedButtonProps extends Omit<ButtonProps, 'style'> {
  loading?: boolean;
  fullWidth?: boolean;
  style?: ButtonStyle;
}

export default function EnhancedButton({
  style,
  mode = 'text',
  fullWidth,
  ...props
}: EnhancedButtonProps) {
  const baseStyle: ButtonStyle =
    mode === 'contained'
      ? buttonStyles.button_contained
      : mode === 'outlined'
      ? buttonStyles.button_outlined
      : undefined;

  // Reuse the primary style for contained/outlined buttons
  const shapeStyle: ButtonStyle =
    mode === 'contained' || mode === 'outlined'
      ? buttonStyles.button_primary
      : undefined;

  const fullWidthStyle: ButtonStyle = fullWidth ? { width: '100%' } : undefined;

  const buttonStyle: ButtonStyle = [
    baseStyle,
    shapeStyle,
    fullWidthStyle,
    style,
  ].filter(Boolean);

  return <Button mode={mode} style={buttonStyle} {...props} />;
}

import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import styles from '../config/styles';

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
  const baseStyle: ButtonStyle = mode === 'contained'
    ? styles.button_contained
    : mode === 'outlined'
      ? styles.button_outlined
      : undefined;

  const shapeStyle: ButtonStyle = mode === 'contained' || mode === 'outlined'
    ? styles.button_primary
    : undefined;

  const fullWidthStyle: ButtonStyle = fullWidth
    ? { width: '100%' }
    : undefined;

  const buttonStyle: ButtonStyle = [
    baseStyle,
    shapeStyle,
    fullWidthStyle,
    style,
  ].filter(Boolean);

  return (
    <Button
      mode={mode}
      style={buttonStyle}
      {...props}
    />
  );
}

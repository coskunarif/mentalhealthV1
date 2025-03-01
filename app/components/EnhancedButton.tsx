import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import buttonStyles from '../config/button.styles';
import { theme } from '../config/theme';

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

  const shapeStyle: ButtonStyle =
    mode === 'contained' || mode === 'outlined'
      ? buttonStyles.button_primary
      : undefined;

  const fullWidthStyle: ButtonStyle = fullWidth ? { width: '100%' } : undefined;

  const buttonStyle: ButtonStyle = [baseStyle, shapeStyle, fullWidthStyle, style].filter(Boolean);

  return (
    <Button
      mode={mode}
      style={buttonStyle}
      labelStyle={{
        fontWeight: '600',
        fontSize: theme.scaleFont(16),
        color: mode === 'contained' ? theme.colors.onPrimary : theme.colors.primary,
        textTransform: 'uppercase',
      }}
      {...props}
    />
  );
}

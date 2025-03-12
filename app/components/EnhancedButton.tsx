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
  icon?: string; // Add icon support
}

export default function EnhancedButton({
  style,
  mode = 'text',
  fullWidth,
  icon, // Allow icon prop
  ...props
}: EnhancedButtonProps) {
  const baseStyle: ButtonStyle =
    mode === 'contained'
      ? { ...buttonStyles.button_contained, height: theme.componentSizes.buttonHeight || 40 }
      : mode === 'outlined'
      ? { ...buttonStyles.button_outlined, height: theme.componentSizes.buttonHeight || 40 }
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
      icon={icon} // Set the icon
      labelStyle={{
        fontWeight: '500', // Medium weight per Material Design
        fontSize: theme.scaleFont(14),
        letterSpacing: 0.1, // Material Design button label spec
        textTransform: 'uppercase',
        color: mode === 'contained' ? theme.colors.onPrimary : theme.colors.primary,
      }}
      {...props}
    />
  );
}

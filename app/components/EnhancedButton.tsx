import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { StyleProp, ViewStyle, TextStyle, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../config/theme';

type ButtonStyle = StyleProp<ViewStyle>;

interface EnhancedButtonProps extends Omit<ButtonProps, 'style'> {
  loading?: boolean;
  fullWidth?: boolean;
  style?: ButtonStyle;
  icon?: string;
  contentStyle?: StyleProp<ViewStyle>;
  variant?: 'default' | 'option' | 'exercise';
  selected?: boolean;
  iconComponent?: React.ReactNode;
}

export default function EnhancedButton({
  style,
  mode = 'text',
  fullWidth,
  icon,
  labelStyle,
  contentStyle,
  variant = 'default',
  selected,
  iconComponent,
  children,
  ...props
}: EnhancedButtonProps) {
  const baseStyle: ButtonStyle = variant === 'option' ? {
    height: 56,
    borderRadius: 12,
    marginVertical: -2,
    backgroundColor: selected ? theme.colors.primary : '#F5F5F5',
    borderColor: selected ? 'transparent' : theme.withOpacity(theme.colors.outline, 0.2),
    borderWidth: 1,
    shadowColor: selected ? theme.colors.primary : theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: selected ? 0.2 : 0.15,
    shadowRadius: selected ? 4 : 3,
    elevation: selected ? 4 : 3,
  } : variant === 'exercise' ? {
    height: theme.componentSizes?.buttonHeight || 40,
    borderRadius: theme.componentSizes?.buttonBorderRadius || 20,
    backgroundColor: mode === 'contained' ? theme.colors.primary : undefined,
    elevation: theme.colors.elevation?.level2 || 2,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  } : {
    height: 40,
    borderRadius: 12,
    backgroundColor: mode === 'contained' ? theme.withOpacity(theme.colors.primary, 0.9) : undefined,
    opacity: mode === 'contained' ? (icon === 'arrow-left' ? 0.85 : 1) : undefined,
  };

  const fullWidthStyle: ButtonStyle = fullWidth ? { flex: 1 } : undefined;

  const buttonStyle: ButtonStyle = [baseStyle, fullWidthStyle, style].filter(Boolean);

  const defaultLabelStyle: TextStyle = variant === 'option' ? {
    fontSize: 16,
    letterSpacing: 0.15,
    color: selected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
  } : variant === 'exercise' ? {
    fontSize: 14,
    letterSpacing: 0.5,
    fontWeight: '500' as const,
    lineHeight: 20,
    color: mode === 'contained' ? theme.colors.onPrimary : theme.colors.primary,
  } : {
    fontSize: 13,
    letterSpacing: 0.5,
    fontWeight: '500' as const,
    color: mode === 'contained' ? theme.colors.onPrimary : theme.colors.primary,
  };

  const defaultContentStyle: ViewStyle = variant === 'option' ? {
    height: 56,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  } : variant === 'exercise' ? {
    maxWidth: '100%',
    paddingHorizontal: 8,
  } : {};

  const content = variant === 'option' ? (
    <View style={[defaultContentStyle, contentStyle]}>
      {iconComponent}
      <View style={{ marginLeft: 20, flex: 1 }}>
        {typeof children === 'string' ? (
          <Text style={[defaultLabelStyle, labelStyle]}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  ) : children;

  return (
    <Button
      mode={mode}
      style={buttonStyle}
      icon={variant === 'default' || variant === 'exercise' ? icon : undefined}
      labelStyle={variant === 'default' || variant === 'exercise' ? [defaultLabelStyle, labelStyle] : undefined}
      contentStyle={variant === 'option' ? undefined : [defaultContentStyle, contentStyle]}
      {...props}
    >
      {content}
    </Button>
  );
}

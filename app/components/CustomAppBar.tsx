import React from 'react';
import { View, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../hooks/useAppTheme';

export const CustomAppBar: React.FC<{
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  elevation?: number;
  transparent?: boolean;
}> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightContent,
  elevation = 0,
  transparent = false,
}) => {
  const theme = useAppTheme();
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  // Calculate platform-specific dimensions
  const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
  const appBarHeight = 56; // Material Design standard
  const totalHeight = statusBarHeight + appBarHeight;

  const styles = StyleSheet.create({
    container: {
      height: totalHeight,
      width: '100%',
      backgroundColor: transparent ? 'transparent' : theme.colors.surface,
      elevation: transparent ? 0 : theme.colors.elevation.level1,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: elevation > 0 ? 1 : 0 },
      shadowOpacity: elevation > 0 ? 0.1 : 0,
      shadowRadius: elevation,
      zIndex: 10,
    },
    content: {
      position: 'absolute',
      top: statusBarHeight,
      left: 0,
      right: 0,
      height: appBarHeight,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 4,
    },
    backButtonContainer: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
      paddingHorizontal: 16,
      alignItems: showBackButton ? 'flex-start' : 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: '500',
      color: theme.colors.onSurface,
      letterSpacing: 0.15,
    },
    rightContentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  if (!showBackButton && !rightContent && transparent && !title) {
    return <View style={{ height: totalHeight }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={handleBack}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={theme.colors.onSurface}
            />
          </TouchableOpacity>
        )}

        {title && (
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>
        )}

        {rightContent && (
          <View style={styles.rightContentContainer}>
            {rightContent}
          </View>
        )}
      </View>
    </View>
  );
};

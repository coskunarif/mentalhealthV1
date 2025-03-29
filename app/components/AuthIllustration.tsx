import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from 'react-native-paper';
import type { AppTheme } from '../types/theme';

interface AuthIllustrationProps {
  type?: 'login' | 'signup' | 'reset';
}

const AuthIllustration = ({ type = 'login' }: AuthIllustrationProps) => {
  const theme = useTheme<AppTheme>();
  
  return (
    <View style={styles.container}>
      {type === 'login' && (
        <Svg width="120" height="120" viewBox="0 0 120 120">
          <Circle cx="60" cy="60" r="20" fill={theme.colors.primaryContainer} />
          <Path
            d="M60,30 C40,45 20,90 60,90 C100,90 80,45 60,30Z"
            fill={theme.colors.primary}
            opacity={0.7}
          />
        </Svg>
      )}
      {type === 'signup' && (
        <Svg width="120" height="120" viewBox="0 0 120 120">
          <Circle cx="60" cy="60" r="30" fill={theme.colors.primaryContainer} opacity={0.5} />
          <Circle cx="60" cy="60" r="15" fill={theme.colors.primary} opacity={0.7} />
        </Svg>
      )}
      {type === 'reset' && (
        <Svg width="120" height="120" viewBox="0 0 120 120">
          <Path
            d="M40,60 C40,70 50,80 60,80 C70,80 80,70 80,60 C80,50 70,40 60,40"
            stroke={theme.colors.primary}
            strokeWidth="5"
            fill="none"
          />
          <Path
            d="M60,40 L50,30 L60,20 L70,30 L60,40"
            fill={theme.colors.primary}
          />
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  }
});

export default AuthIllustration;
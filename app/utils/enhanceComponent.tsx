import React, { Animated, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styleEnhancements from './styleEnhancements';
import type { ComponentType } from 'react';

type WithPressAnimationProps = {
  style?: ViewStyle;
  [key: string]: any;
};

type WithShadowProps = {
  style?: ViewStyle;
  shadowLevel?: 'soft' | 'medium';
  [key: string]: any;
};

type WithGradientProps = {
  style?: ViewStyle;
  baseColor: string;
  [key: string]: any;
};

// Helper to enhance any existing component with animations
export const withPressAnimation = (WrappedComponent: ComponentType<any>) => {
  return ({ style, ...props }: WithPressAnimationProps) => {
    const { pressIn, pressOut, transform } = styleEnhancements.createPressAnimation();

    return (
      <Animated.View style={[style, { transform }]}>
        <TouchableOpacity
          onPressIn={pressIn}
          onPressOut={pressOut}
          activeOpacity={0.9}
        >
          <WrappedComponent {...props} />
        </TouchableOpacity>
      </Animated.View>
    );
  };
};

// Helper to add shadow to existing components
export const withShadow = (WrappedComponent: ComponentType<any>) => {
  return ({ style, shadowLevel = 'soft', ...props }: WithShadowProps) => {
    return (
      <WrappedComponent
        style={[style, styleEnhancements.enhanceShadow(shadowLevel)]}
        {...props}
      />
    );
  };
};

// Helper to add gradient background to existing components
export const withGradient = (WrappedComponent: ComponentType<any>) => {
  return ({ style, baseColor, ...props }: WithGradientProps) => {
    const gradientColors: [string, string] = [baseColor, `${baseColor}E6`];
    
    return (
      <LinearGradient 
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={style}
      >
        <WrappedComponent {...props} />
      </LinearGradient>
    );
  };
};

export default {
    withPressAnimation,
    withShadow,
    withGradient
}

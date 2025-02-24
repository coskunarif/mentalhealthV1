import React, { useState } from 'react';
import { View, ScrollView, Dimensions, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from '../config/styles';
import type { AppTheme } from '../types/theme';

const { width } = Dimensions.get('window');

interface WelcomeCarouselProps {
  style?: ViewStyle;
}

const features = [
  {
    title: 'Guided Meditation',
    description: 'Access a library of guided meditations for stress relief and mindfulness',
  },
  {
    title: 'Mood Tracking',
    description: 'Track your daily moods and emotions to understand your patterns',
  },
  {
    title: 'Personalized Journey',
    description: 'Get personalized recommendations based on your mental wellness goals',
  },
];

export default function WelcomeCarousel({ style }: WelcomeCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme<AppTheme>();

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(offset / slideSize);
    setActiveIndex(activeIndex);
  };

  return (
    <View style={[styles.layout_container, style]}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.layout_scrollView}
      >
        {features.map((feature, index) => (
          <View
            key={index}
            style={[styles.layout_content, { width }, styles.welcomeCarousel_item]}
          >
            <Text style={styles.text_heading2}>{feature.title}</Text>
            <Text style={[styles.text_body, styles.welcomeCarousel_description]}>
              {feature.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.layout_footer, styles.welcomeCarousel_footer]}>
        {features.map((_, index) => (
          <View
            key={index}
            style={[
              styles.welcomeCarousel_indicator,
              {
                backgroundColor: index === activeIndex ? theme.colors.primary : theme.colors.outlineVariant,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

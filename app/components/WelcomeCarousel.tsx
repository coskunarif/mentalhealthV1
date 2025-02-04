import React, { useState } from 'react';
import { View, ScrollView, Dimensions, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../config/styles';

const { width } = Dimensions.get('window');

interface WelcomeCarouselProps {
  style?: ViewStyle;
}

const features = [
  {
    title: '🧘‍♀️ Guided Meditation',
    description: 'Access a library of guided meditations for stress relief and mindfulness',
  },
  {
    title: '📊 Mood Tracking',
    description: 'Track your daily moods and emotions to understand your patterns',
  },
  {
    title: '💭 Personalized Journey',
    description: 'Get personalized recommendations based on your mental wellness goals',
  },
];

export function WelcomeCarousel({ style }: WelcomeCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(offset / slideSize);
    setActiveIndex(activeIndex);
  };

  return (
    <View style={[styles.layout.container, style]}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.layout.scrollView}
      >
        {features.map((feature, index) => (
          <View
            key={index}
            style={[styles.layout.content, { width, alignItems: 'center' }]}
          >
            <Text style={styles.text.heading2}>{feature.title}</Text>
            <Text style={[styles.text.body, { marginTop: 16, textAlign: 'center' }]}>
              {feature.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.layout.footer, { flexDirection: 'row', justifyContent: 'center' }]}>
        {features.map((_, index) => (
          <View
            key={index}
            style={[
              { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
              {
                backgroundColor: index === activeIndex ? styles.colors.primary : styles.colors.disabled,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

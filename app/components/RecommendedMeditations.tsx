import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from '../config/styles';
import EnhancedCard from './EnhancedCard';

interface Meditation {
  id: string;
  title: string;
  duration: string;
  category: string;
}

interface RecommendedMeditationsProps {
  meditations: Meditation[];
}

export default function RecommendedMeditations({ meditations }: RecommendedMeditationsProps) {
  return (
    <View style={styles.styles.component.recommendations.container}>
      <Text style={[styles.styles.text.heading2, { marginBottom: 16 }]}>
        Recommended for You
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.styles.component.recommendations.scrollView}
      >
        {meditations.map((meditation) => (
          <Link
            key={meditation.id}
            href={{
              pathname: '/player',
              params: {
                meditationId: meditation.id,
                returnTo: 'tabs/home',
              },
            }}
            asChild
          >
            <EnhancedCard style={styles.styles.component.recommendations.card as any}>
              <Text style={styles.styles.text.heading3}>{meditation.title}</Text>
              <Text style={[styles.styles.text.body, { marginTop: 4 }]}>
                {meditation.duration}
              </Text>
              <Text style={[styles.styles.text.caption, { marginTop: 4 }]}>
                {meditation.category}
              </Text>
            </EnhancedCard>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

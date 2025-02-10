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
    <View style={styles.component_recommendations_container}>
      <Text style={[styles.text_heading2, styles.recommendedMeditations_title]}>
        Recommended for You
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.component_recommendations_scrollView}
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
            <EnhancedCard style={styles.component_recommendations_card}>
              <Text style={styles.text_heading3}>{meditation.title}</Text>
              <Text style={[styles.text_body, styles.recommendedMeditations_duration]}>
                {meditation.duration}
              </Text>
              <Text style={[styles.text_caption, styles.recommendedMeditations_category]}>
                {meditation.category}
              </Text>
            </EnhancedCard>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

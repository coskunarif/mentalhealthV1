import React from 'react';
import { View, Image } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from '../config/quickActions.styles';

const actions = [
  {
    title: 'Take Survey',
    icon: require('../../assets/images/icon.png'),
    href: '/survey',
  },
  {
    title: 'Track Mood',
    icon: require('../../assets/images/icon.png'),
    href: '/mood',
  },
];

export default function QuickActions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.grid}>
        {actions.map((action, index) => (
          <Link key={index} href={action.href} asChild>
            <TouchableRipple
              style={styles.card}
              rippleColor="rgba(0, 0, 0, .1)"
            >
              <View style={styles.cardContent}>
                <Image source={action.icon} style={styles.cardIcon} />
                <Text style={styles.cardTitle}>{action.title}</Text>
              </View>
            </TouchableRipple>
          </Link>
        ))}
      </View>
    </View>
  );
}

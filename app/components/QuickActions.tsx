import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
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
            <TouchableOpacity style={styles.card}>
              <Image source={action.icon} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>{action.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}

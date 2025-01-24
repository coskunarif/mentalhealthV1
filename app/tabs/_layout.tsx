import { Tabs } from 'expo-router';
import { Icon, useColorModeValue } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const tabBgColor = useColorModeValue('white', 'coolGray.800');
  const activeColor = useColorModeValue('primary.600', 'primary.400');
  const inactiveColor = useColorModeValue('coolGray.400', 'coolGray.500');

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBgColor,
          borderTopColor: useColorModeValue('coolGray.200', 'coolGray.700'),
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerStyle: {
          backgroundColor: tabBgColor,
        },
        headerTintColor: useColorModeValue('coolGray.800', 'warmGray.50'),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon as={MaterialIcons} name="home" color={color} size="md" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Icon as={MaterialIcons} name="explore" color={color} size="md" />
          ),
        }}
      />
    </Tabs>
  );
}

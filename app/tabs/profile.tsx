import React from 'react';
import { Box, VStack, Text, HStack, Avatar, Icon, Pressable, Switch } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const stats = [
  { value: '4,100', label: 'minutes' },
  { value: '120', label: 'Scans' },
  { value: '400', label: 'Günlük seri' },
];

const settingsItems = [
  {
    icon: <Icon as={MaterialIcons} name="email" size={5} color="green.600" />,
    label: 'ahmet.mutlu@gmail.com',
    type: 'email'
  },
  {
    icon: <Icon as={MaterialCommunityIcons} name="bell-outline" size={5} color="green.600" />,
    label: 'Mute notifications',
    type: 'toggle'
  },
  {
    icon: <Icon as={MaterialIcons} name="card-membership" size={5} color="green.600" />,
    label: 'Subscription',
    type: 'link'
  },
  {
    icon: <Icon as={MaterialCommunityIcons} name="facebook" size={5} color="green.600" />,
    label: 'facebookaccount',
    type: 'link'
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const renderSettingItem = (item: any) => {
    return (
      <Pressable
        key={item.label}
        py={4}
        flexDirection="row"
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="gray.100"
        _pressed={{ bg: 'gray.50' }}
      >
        <Box w={8}>{item.icon}</Box>
        <Text flex={1} color="gray.600" fontSize="md">
          {item.label}
        </Text>
        {item.type === 'toggle' && (
          <Switch
            size="md"
            colorScheme="green"
            defaultIsChecked={true}
          />
        )}
        {item.type === 'link' && (
          <Icon
            as={MaterialIcons}
            name="chevron-right"
            size={6}
            color="gray.400"
          />
        )}
      </Pressable>
    );
  };

  return (
    <Box flex={1} bg="white" safeArea>
      <VStack space={8} p={6}>
        {/* Profile Header */}
        <VStack space={4} alignItems="center">
          <Avatar
            size="2xl"
            bg="green.500"
            borderWidth={4}
            borderColor="gray.100"
          >
            AM
          </Avatar>
          
          <Text fontSize="lg" color="gray.600" fontWeight="medium">
            +90 532 813 03 88
          </Text>
          
          <Text fontSize="xl" color="gray.700" fontWeight="semibold">
            Ahmet Mutlu
          </Text>
        </VStack>

        {/* Stats */}
        <HStack justifyContent="space-between" px={4}>
          {stats.map((stat, index) => (
            <VStack key={index} alignItems="center" space={1}>
              <Text fontSize="xl" color="gray.700" fontWeight="semibold">
                {stat.value}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {stat.label}
              </Text>
            </VStack>
          ))}
        </HStack>

        {/* Settings */}
        <VStack space={2}>
          {settingsItems.map((item) => renderSettingItem(item))}
        </VStack>
      </VStack>
    </Box>
  );
}

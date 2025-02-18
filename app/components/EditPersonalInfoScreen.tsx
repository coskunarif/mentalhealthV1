import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { EditPersonalInfoForm } from './EditPersonalInfoForm';
import { useRouter } from 'expo-router';
import globalStyles from '../config/styles';

export default function EditPersonalInfoScreen() {
  const router = useRouter();

  const handleSave = async (info: any) => {
    try {
      // TODO: Implement API call to save personal info
      console.log('Saving personal info:', info);
      router.back(); // Navigate back after saving
    } catch (error: any) {
      console.error('Failed to save:', error);
      // You could show an error message here
    }
  };

  return (
    <View style={globalStyles.layout_container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Personal Information" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={globalStyles.layout_content}>
        <Text style={globalStyles.text_subtitle}>
          Update your personal details to keep your profile accurate.
        </Text>
        <EditPersonalInfoForm 
          onSave={handleSave}
          info={{
            name: "",
            email: "",
            phoneNumber: "",
            dateOfBirth: "",
          }}
        />
      </ScrollView>
    </View>
  );
}

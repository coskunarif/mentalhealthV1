import React from 'react';
import { View, ScrollView } from 'react-native';
import { IconButton, Text, Surface } from 'react-native-paper';
import { EditPersonalInfoForm } from './EditPersonalInfoForm';
import { useRouter } from 'expo-router';
import styles from '../config/styles';

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
    <View style={styles.layout_container}>
      <Surface style={styles.header_surface} elevation={2}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text style={styles.text_heading2}>Edit Personal Information</Text>
      </Surface>
      <ScrollView contentContainerStyle={styles.layout_content}>
        <Text style={styles.text_subtitle}>
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

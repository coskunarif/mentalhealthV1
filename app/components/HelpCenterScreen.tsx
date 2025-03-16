import React from 'react';
import { HelpCenterCard } from './HelpCenterCard';
import { useRouter } from 'expo-router';
import { ScreenLayout } from './ScreenLayout';

export default function HelpCenterScreen() {
  const router = useRouter();

  const handleContactSupport = () => {
    console.log('Opening live chat');
  };

  return (
    <ScreenLayout 
      title="Help Center"
      subtitle="Find answers to FAQs or reach out to our support team."
    >
      <HelpCenterCard onContactSupport={handleContactSupport} />
    </ScreenLayout>
  );
}

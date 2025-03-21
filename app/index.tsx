import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from './context/auth';

export default function Index() {
  const { user, initialized } = useAuth();

  if (!initialized) {
    return null;
  }

  if (!user) {
    return <Redirect href="/auth/sign-in" />;
  }

  return <Redirect href="/tabs" />;
}

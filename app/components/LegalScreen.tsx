import React from 'react';
import { LegalLinks } from './LegalLinks';
import { ScreenLayout } from './ScreenLayout';

export default function LegalScreen() {
  return (
    <ScreenLayout
      title="Legal & Privacy"
      subtitle="Review our policies and terms governing your usage."
    >
      <LegalLinks />
    </ScreenLayout>
  );
}

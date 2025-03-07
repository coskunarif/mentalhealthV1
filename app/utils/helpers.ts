import { theme } from '../config/theme';
import type { AppTheme } from '../types/theme';

export const getMoodColorKey = (label: string): keyof AppTheme['moodColors'] | undefined => {
  const lowerCaseLabel = label.toLowerCase();
  for (const key in theme.moodColors) {
    if (key.toLowerCase() === lowerCaseLabel) {
      return key as keyof AppTheme['moodColors'];
    }
  }
  return undefined;
};

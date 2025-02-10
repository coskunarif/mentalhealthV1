// Base color: #5DA47A (Primary Green)
const colors = {
  dominant: '#F2F7F4', // 60% - Very light background
  secondary: '#5DA47A', // 30% - Primary Green
  accent: '#4C8A65', // 10% - Darker shade of primary

  // Surface colors
  surface: '#FFFFFF',
  surfaceVariant: '#F7FAF8',

  // Text colors
  onDominant: '#1A1A1A', // Dark text on light background
  onSecondary: '#FFFFFF', // White text on primary green
  onAccent: '#FFFFFF', // White text on darker green
  onSurface: '#1A1A1A',
  onSurfaceVariant: '#2D2D2D',

  // Status Colors
  error: '#B00020',

  // Mood Colors
  moods: {
    shame: '#E57373', // Reddish
    guilt: '#F06292', // Pinkish Red
    apathy: '#FFB74D', // Orangey
    grief: '#FF8A65', // Lighter Orange
    fear: '#FFF176', // Yellow
    desire: '#A5D6A7', // Light Green
    anger: '#81D4FA', // Light Blue
    pride: '#B39DDB', // Light Purple
    willfulness: '#9575CD', // Purplish
  },
} as const;

// Helper function to create opacity variants
const withOpacity = (color: string, opacity: number) => {
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default {
  colors,
  withOpacity,
};

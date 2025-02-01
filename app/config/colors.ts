// Base color: #5DA47A (Primary Green)
export const colors = {
  primary: '#5DA47A',
  // Lighter shades
  primary50: '#F2F7F4',  // Very light background
  primary100: '#E5EFE9',
  primary200: '#CCDFD5',
  primary300: '#B2CFC2',
  primary400: '#8BBFA8',
  // Darker shades
  primary600: '#4C8A65',
  primary700: '#3B7050',
  primary800: '#2A563B',
  primary900: '#193C26',
  
  // Surface colors with primary tint
  surface: '#FFFFFF',
  surfaceVariant: '#F7FAF8',
  
  // Text colors
  onPrimary: '#FFFFFF',
  onSurface: '#1A1A1A',
  onSurfaceVariant: '#2D2D2D',
} as const;

// Helper function to create opacity variants
export const withOpacity = (color: string, opacity: number) => {
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

import { useTheme } from 'react-native-paper';
import { AppTheme } from '../types/theme';

export const useAppTheme = () => useTheme<AppTheme>();

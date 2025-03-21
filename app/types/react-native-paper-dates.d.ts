declare module 'react-native-paper-dates' {
  import { ReactNode } from 'react';

  interface DatePickerModalProps {
    locale?: string;
    mode: 'single';
    visible: boolean;
    onDismiss: () => void;
    date?: Date;
    onConfirm: (date: Date) => void;
    validRange?: {
      startDate: Date;
      endDate: Date;
    };
  }

  export const DatePickerModal: React.FC<DatePickerModalProps>;
}

export default {};

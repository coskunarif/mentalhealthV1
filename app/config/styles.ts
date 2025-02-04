import { StyleSheet } from 'react-native';
import { FlexAlignType, TextStyle, ViewStyle } from 'react-native';

interface StyleSystem {
  colors: {
    primary: string;
    secondary: string;
    surface: string;
    background: string;
    text: string;
    textSecondary: string;
    disabled: string;
    error: string;
    surfaceVariant: string;
  };
  layout: {
    container: ViewStyle;
    content: ViewStyle;
    header: ViewStyle;
    footer: ViewStyle;
    row: ViewStyle;
    scrollView: ViewStyle;
    form: ViewStyle;
  };
  text: {
    heading1: TextStyle;
    heading2: TextStyle;
    heading3: TextStyle;
    body: TextStyle;
    caption: TextStyle;
    subtitle: TextStyle;
    link: TextStyle;
    button: TextStyle;
    label: TextStyle;
  };
  button: {
    primary: ViewStyle;
    secondary: ViewStyle;
    contained: ViewStyle;
    outlined: ViewStyle;
    icon: ViewStyle;
  };
  component: {
    card: {
      elevated: ViewStyle;
      listItem: ViewStyle;
      selected: ViewStyle;
      interactive: ViewStyle;
      container: ViewStyle;
      content: ViewStyle;
    };
    form: {
      input: ViewStyle;
      error: TextStyle;
    };
    input: {
      container: ViewStyle;
      outline: ViewStyle;
      content: TextStyle;
      label: TextStyle;
      helper: TextStyle;
      error: TextStyle;
      field: ViewStyle;
    };
    link: TextStyle;
    footer: {
      container: ViewStyle;
      content: ViewStyle;
      copyright: TextStyle;
      link: TextStyle;
    };
    recommendations: {
      container: ViewStyle;
      card: ViewStyle;
      grid: ViewStyle;
      scrollView: ViewStyle;
    };
    iconButton: {
      container: ViewStyle;
      icon: ViewStyle;
    };
    progress: {
      container: ViewStyle;
      bar: ViewStyle;
      grid: ViewStyle;
    };
  };
  screen: {
    auth: {
      container: ViewStyle;
      form: ViewStyle;
      header: ViewStyle;
      footer: ViewStyle;
      content: ViewStyle;
    };
    profile: {
      container: ViewStyle;
      header: ViewStyle;
      content: ViewStyle;
    };
    home: {
      container: ViewStyle;
      header: ViewStyle;
      content: ViewStyle;
    };
    mood: {
      container: ViewStyle;
      header: ViewStyle;
      content: ViewStyle;
      grid: ViewStyle;
    };
    legal: {
      container: ViewStyle;
      header: ViewStyle;
      content: ViewStyle;
    };
  };
}

const colors = {
  primary: '#6B4EFF',
  secondary: '#4CAF50',
  surface: '#FFFFFF',
  background: '#F5F5F5',
  text: '#212121',
  textSecondary: '#757575',
  disabled: '#BDBDBD',
  error: '#B00020',
  surfaceVariant: '#E0E0E0',
};

export const styles = {
  colors,
  layout: {
    container: {
      flex: 1,
      backgroundColor: colors.background,
    } as ViewStyle,
    content: {
      flex: 1,
      padding: 16,
    } as ViewStyle,
    header: {
      flexDirection: 'row' as const,
      alignItems: 'center' as FlexAlignType,
      padding: 16,
    } as ViewStyle,
    footer: {
      padding: 16,
      alignItems: 'center' as FlexAlignType,
    } as ViewStyle,
    row: {
      flexDirection: 'row' as const,
      alignItems: 'center' as FlexAlignType,
    } as ViewStyle,
    scrollView: {
      flex: 1,
    } as ViewStyle,
    form: {
      flex: 1,
      padding: 16,
    } as ViewStyle,
  },
  text: {
    heading1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      color: colors.text,
      fontFamily: 'Kameron',
    } as TextStyle,
    heading2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      color: colors.text,
      fontFamily: 'Kameron',
    } as TextStyle,
    heading3: {
      fontSize: 20,
      fontWeight: 'bold' as const,
      color: colors.text,
      fontFamily: 'Kameron',
    } as TextStyle,
    body: {
      fontSize: 16,
      color: colors.text,
    } as TextStyle,
    caption: {
      fontSize: 12,
      color: colors.textSecondary,
    } as TextStyle,
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    } as TextStyle,
    link: {
      color: colors.primary,
      textDecorationLine: 'underline' as const,
    } as TextStyle,
    button: {
      fontSize: 16,
      fontWeight: 'bold' as const,
      color: colors.text,
    } as TextStyle,
    label: {
      fontSize: 14,
      color: colors.text,
      fontWeight: 'bold' as const,
    } as TextStyle,
  },
  button: {
    primary: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      marginVertical: 8,
    } as ViewStyle,
    secondary: {
      borderColor: colors.primary,
      borderRadius: 12,
      marginVertical: 8,
    } as ViewStyle,
    contained: {
      backgroundColor: colors.primary,
    } as ViewStyle,
    outlined: {
      borderWidth: 1,
      borderColor: colors.primary,
    } as ViewStyle,
    icon: {
      padding: 8,
      borderRadius: 20,
    } as ViewStyle,
  },
  component: {
    card: {
      elevated: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
      } as ViewStyle,
      listItem: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
      } as ViewStyle,
      selected: {
        borderWidth: 2,
        borderColor: colors.primary,
      } as ViewStyle,
      interactive: {} as ViewStyle,
      container: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.surface,
        marginVertical: 8,
      } as ViewStyle,
      content: {
        padding: 10,
      } as ViewStyle,
    },
    form: {
      input: {
        marginBottom: 16,
      } as ViewStyle,
      error: {
        color: colors.error,
        fontSize: 12,
        marginTop: 4,
      } as TextStyle,
    },
    input: {
      container: {
        marginBottom: 16,
      } as ViewStyle,
      outline: {
        borderWidth: 1,
        borderRadius: 8,
      } as ViewStyle,
      content: {
        paddingVertical: 8,
        fontSize: 16,
        fontFamily: 'Regular',
      } as TextStyle,
      label: {
        fontSize: 12,
        fontFamily: 'Medium',
        marginBottom: 4,
      } as TextStyle,
      helper: {
        fontSize: 12,
        fontFamily: 'Regular',
        marginTop: 4,
      } as TextStyle,
      error: {
        color: colors.error,
      } as TextStyle,
      field: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
      } as ViewStyle,
    },
    link: {
      color: colors.primary,
      textDecorationLine: 'underline' as const,
    } as TextStyle,
    footer: {
      container: {
        padding: 16,
        backgroundColor: colors.surface,
      } as ViewStyle,
      content: {
        flexDirection: 'row' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center' as FlexAlignType,
      } as ViewStyle,
      copyright: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 10,
      } as TextStyle,
      link: {
        fontSize: 14,
        color: colors.primary,
        textDecorationLine: 'underline' as const,
      } as TextStyle,
    },
    recommendations: {
      container: {
        padding: 16,
      } as ViewStyle,
      card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: colors.surface,
        marginVertical: 8,
      } as ViewStyle,
      grid: {
        flexDirection: 'row' as const,
        flexWrap: 'wrap' as const,
        justifyContent: 'space-between' as const,
        padding: 16,
      } as ViewStyle,
      scrollView: {} as ViewStyle,
    },
    iconButton: {
      container: {
        padding: 8,
        borderRadius: 20,
      } as ViewStyle,
      icon: {
        width: 24,
        height: 24,
      } as ViewStyle,
    },
    progress: {
      container: {
        height: 4,
        backgroundColor: '#e7e0ec',
        borderRadius: 2,
      } as ViewStyle,
      bar: {
        height: 4,
        backgroundColor: colors.primary,
        borderRadius: 2,
      } as ViewStyle,
      grid: {
        flexDirection: 'row' as const,
        flexWrap: 'wrap' as const,
        justifyContent: 'space-between' as const,
        padding: 16,
      } as ViewStyle,
    },
  },
  screen: {
    auth: {
      container: {
        flex: 1,
        backgroundColor: colors.background,
      } as ViewStyle,
      form: {
        flex: 1,
        padding: 24,
      } as ViewStyle,
      header: {
        marginBottom: 48,
      } as ViewStyle,
      footer: {
        padding: 24,
        alignItems: 'center' as FlexAlignType,
      } as ViewStyle,
      content: {
        flex: 1,
        padding: 16,
      } as ViewStyle,
    },
    profile: {
      container: {
        flex: 1,
        backgroundColor: colors.background,
      } as ViewStyle,
      header: {
        padding: 16,
        alignItems: 'center' as FlexAlignType,
      } as ViewStyle,
      content: {
        padding: 16,
      } as ViewStyle,
    },
    home: {
      container: {
        flex: 1,
        backgroundColor: colors.background,
      } as ViewStyle,
      header: {
        marginBottom: 24,
      } as ViewStyle,
      content: {
        padding: 16,
      } as ViewStyle,
    },
    mood: {
      container: {
        flex: 1,
        backgroundColor: colors.background,
      } as ViewStyle,
      header: {
        marginBottom: 24,
      } as ViewStyle,
      content: {
        padding: 16,
      } as ViewStyle,
      grid: {
        flexDirection: 'row' as const,
        flexWrap: 'wrap' as const,
        justifyContent: 'space-between' as const,
      } as ViewStyle,
    },
    legal: {
      container: {
        flex: 1,
        backgroundColor: colors.background,
      } as ViewStyle,
      header: {
        marginBottom: 24,
      } as ViewStyle,
      content: {
        padding: 16,
      } as ViewStyle,
    },
  },
};

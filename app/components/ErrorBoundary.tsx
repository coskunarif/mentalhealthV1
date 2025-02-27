import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { layoutStyles, typographyStyles, buttonStyles } from '../config';
import errorBoundaryStyles from '../config/ErrorBoundary.styles';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    router.replace('/tabs/home');
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View style={layoutStyles.layout_container}>
          <View style={layoutStyles.layout_content}>
            <Text style={typographyStyles.text_heading1}>
              Something went wrong
            </Text>
            <Text style={[typographyStyles.text_body, errorBoundaryStyles.errorMessage]}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </Text>
            <Button
              mode="contained"
              onPress={this.handleReset}
              style={buttonStyles.button_primary}
            >
              Try Again
            </Button>
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}

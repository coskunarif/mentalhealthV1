import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { styles } from '../config/styles';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    router.replace('/tabs/home');
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View style={styles.layout.container}>
          <View style={styles.layout.content}>
            <Text style={styles.text.heading1}>Something went wrong</Text>
            <Text style={[styles.text.body, { marginTop: 8, marginBottom: 24 }]}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </Text>
            <Button
              mode="contained"
              onPress={this.handleReset}
              style={styles.button.primary}
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

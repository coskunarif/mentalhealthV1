import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
};

export type TabStackParamList = {
  home: undefined;
  profile: undefined;
};

export type RootStackParamList = {
  index: undefined;
  auth: NavigatorScreenParams<AuthStackParamList>;
  tabs: NavigatorScreenParams<TabStackParamList>;
  survey: undefined;
  mood: {
    returnTo?: keyof RootStackParamList;
  };
  player: {
    meditationId: string;
    title?: string;
    subtitle?: string;
    returnTo?: keyof RootStackParamList;
  };
  welcome: undefined;
  'not-found': undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

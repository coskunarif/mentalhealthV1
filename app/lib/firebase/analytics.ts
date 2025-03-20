import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';
import { analytics } from './firebase';

export const logCustomEvent = (eventName: string, params?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics as Analytics, eventName, params);
  }
};

export const logScreenView = (screenName: string, screenClass?: string) => {
  logCustomEvent('screen_view', {
    firebase_screen: screenName,
    firebase_screen_class: screenClass || screenName
  });
};

export const logUserAction = (action: string, params?: Record<string, any>) => {
  logCustomEvent('user_action', {
    action,
    ...params
  });
};
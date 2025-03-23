import { Messaging } from 'firebase-admin/messaging';

declare module 'firebase-admin/messaging' {
  interface Messaging {
    sendMulticast(message: {
      tokens: string[];
      notification?: {
        title?: string;
        body?: string;
      };
      data?: {
        [key: string]: string;
      };
      android?: {
        priority?: string;
      };
      apns?: {
        payload?: {
          aps?: {
            contentAvailable?: boolean;
          };
        };
      };
    }): Promise<{
      responses: any[];
      successCount: number;
      failureCount: number;
    }>;
  }
}
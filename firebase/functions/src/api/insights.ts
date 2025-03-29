import { HttpsError, onCall } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions/v2';

interface MoodData {
  timestamp: admin.firestore.Timestamp;
  mood: string;
  value: number;
  factors?: string[];
  notes?: string;
}

interface RateLimitData {
  count: number;
  lastReset: number;
  calls: number[];
  lastAccess?: number;
}

// Add rate limiting and data validation
export const generateMoodInsights = onCall({
  // Function configuration
  timeoutSeconds: 60,
  memory: '256MiB',
  maxInstances: 10,
  minInstances: 0,
  region: 'europe-west1'
}, async (request: any) => {
  // Authentication check
  if (!request.auth) {
    throw new HttpsError(
      'unauthenticated',
      'You must be logged in to access this feature'
    );
  }

  const data = request.data;
  
  // Input validation
  if (!data || !data.timeframe || !['week', 'month', 'year'].includes(data.timeframe)) {
    throw new HttpsError(
      'invalid-argument',
      'Timeframe must be one of: week, month, year',
      { providedTimeframe: data?.timeframe }
    );
  }

  const userId = request.auth.uid;
  const timeframe = data.timeframe;

  try {
    // Simple implementation for now to get things working
    logger.info('Generating mood insights', {
      userId,
      timeframe
    });

    return {
      success: true,
      insights: {
        period: timeframe,
        entriesCount: 0,
        averageMood: 0,
        moodAverages: {},
        topMood: "neutral",
        highestMood: { type: "neutral", value: 0 },
        lowestMood: { type: "neutral", value: 0 },
        moodsByDay: {}
      },
      message: 'Insights generated successfully'
    };
  } catch (error) {
    logger.error('Error generating mood insights', error, {
      userId,
      timeframe
    });

    if (error instanceof HttpsError) {
      throw error; // Re-throw if it's already a proper HttpsError
    }

    throw new HttpsError(
      'internal',
      'An error occurred while generating insights'
    );
  }
});

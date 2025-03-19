import * as functions from 'firebase-functions/v2';
import * as admin from 'firebase-admin';

interface MoodData {
  timestamp: admin.firestore.Timestamp;
  mood: string;
  value: number;
  factors?: string[];
  notes?: string;
}

export const generateMoodInsights = functions.https.onCall(async (request) => {
  const data = request.data as { timeframe: string };
  const context = request.auth;

  if (!context) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to access this feature'
    );
  }

  if (!data || !data.timeframe || !['week', 'month', 'year'].includes(data.timeframe)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Timeframe must be one of: week, month, year',
      { providedTimeframe: data?.timeframe }
    );
  }

  const userId = context.uid;
  const timeframe = data.timeframe;

  try {
    const now = new Date();
    let startDate = new Date();

    switch (timeframe) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const moodsRef = admin.firestore()
      .collection('moods')
      .where('userId', '==', userId)
      .where('timestamp', '>=', admin.firestore.Timestamp.fromDate(startDate))
      .orderBy('timestamp', 'asc');

    const snapshot = await moodsRef.get();
    const moods: MoodData[] = [];

    snapshot.forEach((doc) => {
      moods.push(doc.data() as MoodData);
    });

    if (moods.length === 0) {
      return {
        success: true,
        insights: null,
        message: 'Not enough data to generate insights.'
      };
    }

    const moodsByType: { [key: string]: number[] } = {};
    let totalMoodValue = 0;
    let highestMood = { type: '', value: 0 };
    let lowestMood = { type: '', value: 100 };

    moods.forEach((mood) => {
      if (!moodsByType[mood.mood]) {
        moodsByType[mood.mood] = [];
      }
      moodsByType[mood.mood].push(mood.value);
      totalMoodValue += mood.value;

      if (mood.value > highestMood.value) {
        highestMood = { type: mood.mood, value: mood.value };
      }
      if (mood.value < lowestMood.value) {
        lowestMood = { type: mood.mood, value: mood.value };
      }
    });

    const moodAverages: { [key: string]: number } = {};
    let overallMoodAverage = totalMoodValue / moods.length;

    Object.keys(moodsByType).forEach((mood) => {
      const values = moodsByType[mood];
      moodAverages[mood] = values.reduce((a, b) => a + b, 0) / values.length;
    });

    const insights = {
      period: timeframe,
      entriesCount: moods.length,
      averageMood: overallMoodAverage,
      moodAverages,
      topMood: Object.keys(moodAverages).reduce((a, b) => moodAverages[a] > moodAverages[b] ? a : b),
      highestMood,
      lowestMood,
      moodsByDay: {} as { [key: string]: number }
    };

    const moodsByDay: { [key: string]: number[] } = {};
    moods.forEach((mood) => {
      const day = mood.timestamp.toDate().toISOString().split('T')[0];
      if (!moodsByDay[day]) moodsByDay[day] = [];
      moodsByDay[day].push(mood.value);
    });
    insights.moodsByDay = Object.fromEntries(
      Object.entries(moodsByDay).map(([day, values]) => [day, values.reduce((a, b) => a + b, 0) / values.length])
    );

    functions.logger.info('Mood insights generated', {
      userId,
      timeframe,
      entriesCount: moods.length
    });

    return {
      success: true,
      insights,
      message: 'Insights generated successfully'
    };
  } catch (error) {
    functions.logger.error('Error generating mood insights', {
      userId,
      timeframe,
      error: error instanceof Error ? error.toString() : 'Unknown error'
    });

    if (error instanceof Error && 'code' in error && error.code === 'resource-exhausted') {
      throw new functions.https.HttpsError(
        'resource-exhausted',
        'Too many requests, please try again later'
      );
    }

    throw new functions.https.HttpsError(
      'internal',
      'An error occurred while generating insights'
    );
  }
});
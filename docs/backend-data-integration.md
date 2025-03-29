# Comprehensive Backend Data Integration Guide

## Overview of Firebase Backend Data

This guide provides a comprehensive list of your backend data collections and their integration status in your mobile application. I'll cover each collection, its purpose, required fields, and how to ensure proper data integration.

## 1. User Profiles Collection (`users`)

**Purpose**: Stores user account information, preferences, and statistics.

**Required Fields**:
- `uid`: String - Firebase Auth user ID
- `email`: String - User's email address
- `displayName`: String - User's display name
- `photoURL`: String (optional) - Profile image URL
- `createdAt`: Timestamp - Account creation date
- `updatedAt`: Timestamp - Last update timestamp
- `settings`: Object
  - `notifications`: Object
    - `reminders`: Boolean
    - `progress`: Boolean
    - `tips`: Boolean
    - `community`: Boolean
  - `language`: String - Preferred language code
  - `theme`: String - UI theme preference
- `stats`: Object
  - `meditationMinutes`: Number
  - `exercisesCompleted`: Number
  - `streak`: Number
  - `surveysCompleted`: Number
  - `lastActiveDate`: Timestamp or null

**Integration Steps**:
1. Verify the `auth.tsx` context properly loads user data and syncs with Firestore
2. Check that `UserService.ts` correctly fetches and updates user data
3. Ensure user preferences update UI elements (theme, language)
4. Verify stats are displayed correctly on profile screens
5. Test user document creation via the `ensureUserDocument` Cloud Function

## 2. Exercises Collection (`exercises`)

**Purpose**: Defines the available breathing and mindfulness exercises.

**Required Fields**:
- `id`: String - Unique identifier
- `title`: String - Exercise name
- `duration`: Number - Duration in minutes
- `category`: String - One of: "breathing", "mindfulness", "compassion", "relaxation"
- `description`: String - Exercise instructions
- `order`: Number - Display sequence

**Integration Steps**:
1. Verify `ExerciseService.ts` correctly loads exercise data
2. Check that exercises appear in the correct order on the Exercises tab
3. Ensure exercise categories are correctly displayed in the radar chart
4. Test exercise completion tracking updates user statistics
5. Verify exercise progress visualization in `ExerciseProgress.tsx`

## 3. Meditations Collection (`meditations`)

**Purpose**: Stores guided meditation audio sessions.

**Required Fields**:
- `id`: String - Unique identifier
- `title`: String - Meditation name
- `duration`: Number - Duration in minutes
- `description`: String - Brief description
- `audioUrl`: String - Path to audio file in Firebase Storage

**Integration Steps**:
1. Verify audio URLs correctly reference Firebase Storage paths
2. Test audio playback in the player screen
3. Ensure meditation completion is tracked in user statistics
4. Check that completed meditations appear in recent activities

## 4. Mood Definitions Collection (`moodDefinitions`)

**Purpose**: Defines the types of moods users can select.

**Required Fields**:
- `name`: String - Displayed mood name
- `key`: String - Unique identifier for the mood
- `icon`: String - MaterialCommunityIcons name

**Integration Steps**:
1. Verify `MoodService.ts` correctly loads mood definitions
2. Check that moods appear with correct icons in `MoodSelector.tsx`
3. Ensure mood colors defined in theme.ts match the keys
4. Test that selected moods trigger the correct UI changes

## 5. Emotion Definitions Collection (`emotionDefinitions`)

**Purpose**: Defines emotions for the mood pyramid visualization.

**Required Fields**:
- `id`: String - Unique identifier
- `name`: String - Emotion name
- `moodKey`: String - References mood color key
- `pyramidOrder`: Number - Position in pyramid

**Integration Steps**:
1. Verify `MoodService.getEmotionDefinitions()` loads data correctly
2. Check that emotions appear in correct positions in `MoodPyramid.tsx`
3. Ensure emotion colors match the theme definition
4. Test selection and deselection of emotions

## 6. Moods Collection (`moods`)

**Purpose**: Stores user mood entries.

**Required Fields**:
- `userId`: String - Reference to user ID
- `timestamp`: Timestamp - When mood was recorded
- `mood`: String - Selected mood name
- `value`: Number - Intensity (0-100)
- `duration`: Number (optional) - Duration of mood
- `factors`: Array (optional) - Contributing factors
- `notes`: String (optional) - User notes
- `createdAt`: Timestamp - Entry creation time

**Integration Steps**:
1. Verify `MoodService.saveMoodEntry()` correctly stores new entries
2. Check that mood history is properly retrieved and displayed
3. Test that mood factors are correctly saved and displayed
4. Ensure mood entries appear in recent activities

## 7. Surveys Collection (`surveys`)

**Purpose**: Stores user survey responses.

**Required Fields**:
- `userId`: String - Reference to user ID
- `timestamp`: Timestamp - When survey was completed
- `responses`: Array - User's answers
- `questions`: Array - Question text for context
- `createdAt`: Timestamp - Entry creation time

**Integration Steps**:
1. Verify `SurveyService.saveSurveyResponse()` correctly stores responses
2. Check that survey completion updates user statistics
3. Test that survey activity appears in recent activities
4. Ensure survey questions match between app and saved data

## 8. User Progress Subcollection (`users/{userId}/progress`)

**Purpose**: Tracks user progress across different categories.

**Key Documents**:
- `overview`: Object
  - `overall`: Number - Overall progress percentage
  - `categories`: Object - Progress by category
  - `lastUpdated`: Timestamp - Last updated time
- Individual exercise progress documents

**Integration Steps**:
1. Verify `ExerciseService.completeExercise()` updates progress documents
2. Check that `getRadarData()` correctly retrieves progress data
3. Test that progress visualization properly reflects completion state
4. Ensure progress updates properly influence stats

## 9. User Activities Subcollection (`users/{userId}/activities`)

**Purpose**: Records user activity history.

**Required Fields**:
- `type`: String - Activity type (meditation, exercise, mood, survey)
- `timestamp`: Timestamp - When activity occurred
- `date`: String - ISO date format for easier querying
- `details`: Object - Activity-specific information
  - `title`: String - Activity title
  - `duration`: Number (optional) - Duration in minutes
  - `itemId`: String (optional) - Reference to related item

**Integration Steps**:
1. Verify activities are created for all tracked actions
2. Check that `getRecentActivities()` retrieves correct data
3. Test activities display correctly in `RecentActivities.tsx`
4. Ensure activity timestamps are displayed in user-friendly format

## 10. Stats Collection (`stats`)

**Purpose**: Records app-wide daily statistics.

**Required Fields**:
- Document ID: 'YYYY-MM-DD' date format
- `date`: String - Date in YYYY-MM-DD format
- `activeUsers`: Number - Users active that day
- `newUsers`: Number - New registrations
- `meditationMinutes`: Number - Total meditation minutes
- `exercisesCompleted`: Number - Total exercises completed
- `surveysCompleted`: Number - Total surveys completed
- `timestamp`: Timestamp - Last updated time

**Integration Steps**:
1. This collection is primarily for admin purposes, not directly displayed in the app
2. Verify the `dailyStats` Cloud Function updates this correctly

## Implementation Verification Procedure

For each data collection:

1. **Test Data Fetching**:
   - Check network requests in development mode
   - Verify data is correctly transformed for UI components

2. **Test Data Writing**:
   - Submit new entries from the app
   - Verify Firestore documents are created with correct fields

3. **Test Offline Behavior**:
   - Enable offline mode and test data access
   - Verify data synchronizes when back online

4. **Test Error Handling**:
   - Force errors by temporarily modifying security rules
   - Verify app gracefully handles and displays errors

5. **Verify Data Relationships**:
   - Check that related collections update correctly
   - Verify subcollections update when parent collections change

By methodically verifying each collection and its integration points, you'll ensure your app correctly interacts with your Firebase backend data.

**Project Goal:**

Build a secure, scalable, and user-friendly mental health mobile app (iOS and Android) that provides personalized audio tracks based on user surveys and emotional states.

**Technology Stack:**

*   Frontend: Expo (managed workflow), React Native, TypeScript, Tamagui (UI Library), React Navigation
*   Backend: Firebase (Authentication, Firestore, Storage, Cloud Functions)
*   State Management: Zustand

**Plan for the AI Coder (AI Editor Implementation):**

**Phase 1: Secure User Authentication and Onboarding**

*   **Step 3: Implement Secure User Authentication with Apple, Google, and Facebook Sign-In:**
    *   **Task:** Use Firebase Authentication to implement user registration and login. Support Apple Sign-In, Google Sign-In, and Facebook Sign-In, along with email/password. Create the necessary UI screens (sign-up, sign-in, forgot password) using Tamagui components.
    *   **Code Implementation (AI Editor):**
        *   Install the `expo-facebook` package.
        *   Import necessary functions from the Firebase SDK: `signInWithPopup`, `signInWithRedirect`, `FacebookAuthProvider`, `GoogleAuthProvider`, `AppleAuthProvider`, `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, etc.
        *   Create UI components for sign-up, sign-in, and forgot password screens using Tamagui.
        *   Implement functions to handle user interaction with the sign-up and sign-in buttons:
            *   `handleEmailSignUp`: Creates a new user account with email and password.
            *   `handleEmailSignIn`: Signs in an existing user with email and password.
            *   `handleForgotPassword`: Sends a password reset email to the user.
            *   `handleGoogleSignIn`: Initiates the Google sign-in flow using `signInWithPopup` or `signInWithRedirect` and `GoogleAuthProvider`.
            *   `handleAppleSignIn`: Initiates the Apple sign-in flow using `signInWithPopup` and `AppleAuthProvider`.
            *   `handleFacebookSignIn`: Initiates the Facebook sign-in flow using `signInWithPopup` and `FacebookAuthProvider`.
        *   Store the currently logged-in user's information (e.g., user ID, email, provider) using Zustand.
        *   Handle errors appropriately and provide feedback to the user in the UI.

    *   **Example Code Snippet (AI Editor - Facebook Sign-in):**

        ```typescript
        import { auth, facebookProvider } from '../../config/firebase';
        import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';

        // ... inside your authentication component ...

        const handleFacebookSignIn = async () => {
          try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            // Store user data in Zustand and Firestore
          } catch (error) {
            // Handle errors, display messages to the user
            console.error("Facebook Sign-In Error:", error);
          }
        };
        ```

*   **Step 4: Design Onboarding and Survey Flow:**
    *   **Task:** Create a user-friendly onboarding flow to introduce the app's features. Integrate the survey component into the onboarding process. Collect initial user data relevant to the coaching service.
    *   **Code Implementation (AI Editor):**
        *   Design and implement the onboarding screens using Tamagui components.
        *   Create a survey form component using Tamagui form elements (input fields, sliders, radio buttons, etc.).
        *   Structure the survey questions logically and use clear, concise language.
        *   Implement input validation to ensure data quality.
        *   Ensure accessibility by adding screen reader support, contrast checks, and keyboard navigation to the onboarding and survey components.

**Phase 2: Enhanced Data Modeling and Storage**

*   **Step 5: Store Survey Data with Historical Tracking:**
    *   **Task:** When a user completes the survey, store their responses in Firestore. Structure the data to allow for historical tracking.
    *   **Code Implementation (AI Editor):**
        *   Create a function `storeSurveyData` that takes the user ID and survey responses as input.
        *   Use the Firebase SDK to interact with Firestore:
            *   Get a reference to the user's document in the `users` collection.
            *   Add a new document to the `surveyResponses` subcollection with a timestamp and the survey data.
        *   Consider adding a version number to the survey data to track changes to the survey structure over time.

    *   **Example Code Snippet (AI Editor - Firestore Interaction):**

        ```typescript
        import { db } from '../../config/firebase';
        import { doc, addDoc, collection, serverTimestamp } from 'firebase/firestore';

        const storeSurveyData = async (userId: string, surveyData: any) => {
          try {
            const userDocRef = doc(db, 'users', userId);
            const surveyResponsesRef = collection(userDocRef, 'surveyResponses');
            await addDoc(surveyResponsesRef, {
              timestamp: serverTimestamp(),
              version: 1, // Example versioning
              data: surveyData,
            });
          } catch (error) {
            console.error("Error storing survey data:", error);
          }
        };
        ```

**Phase 3: Secure and Scalable Coaching Service**

*   **Step 6: Define and Store Coaching Rules in Firestore:**
    *   **Task:** Create a set of rules that map survey responses and emotional states to audio tracks and weekly plans. Store these rules in a `coachingRules` collection in Firestore.
    *   **Code Implementation (AI Editor):**
        *   Define the structure of a coaching rule document (e.g., JSON format with `conditions` and `plan` properties).
        *   Create functions to add, update, and delete coaching rules in Firestore (these functions will likely be used by an admin interface or a separate script, not directly from the app).

*   **Step 7: Implement Plan Generation Logic in Firebase Cloud Functions:**
    *   **Task:** Create a Firebase Cloud Function that generates a personalized weekly plan.
    *   **Code Implementation (AI Editor):**
        *   Write a Cloud Function in TypeScript (or JavaScript) that:
            *   Takes a user's ID, survey data, and current emotional state as input.
            *   Fetches the relevant coaching rules from the `coachingRules` collection in Firestore.
            *   Applies the rules to generate a weekly plan (an array of objects, each with a day and a list of audio track IDs).
            *   Stores the generated plan in the `weeklyPlans` subcollection under the user's document in Firestore.
        *   Handles errors and edge cases gracefully.
        *   Optimizes for performance to minimize execution time.

    *   **Example Code Snippet (AI Editor - Cloud Function):**

        ```typescript
        // This is a simplified example of a Cloud Function

        import * as functions from 'firebase-functions';
        import * as admin from 'firebase-admin';

        admin.initializeApp();
        const db = admin.firestore();

        export const generateWeeklyPlan = functions.https.onCall(async (data, context) => {
          const userId = context.auth.uid;
          const { emotionalState } = data;

          // 1. Fetch user's survey data (simplified)
          const userDoc = await db.collection('users').doc(userId).get();
          const surveyData = userDoc.data().surveyResponses; // Assuming you get the latest

          // 2. Fetch coaching rules
          const rulesSnapshot = await db.collection('coachingRules').get();
          const rules = rulesSnapshot.docs.map((doc) => doc.data());

          // 3. Apply rules (simplified logic)
          let plan = [];
          // ... (Apply your rule-matching logic here) ...

          // 4. Store the plan
          const planDoc = await db.collection('users').doc(userId).collection('weeklyPlans').add({
            startDate: admin.firestore.Timestamp.now(),
            plan: plan, 
          });

          return { planId: planDoc.id };
        });
        ```

*   **Step 8: Store Weekly Plans with Subcollections:**
    *   **Task:** Store the generated weekly plans in Firestore using a `weeklyPlans` subcollection under each user's document.
    *   **Code Implementation (AI Editor):**
        *   The Cloud Function in Step 7 will handle storing the weekly plan. Ensure the plan is stored in the correct format: `users/{uid}/weeklyPlans/{planId}`.

**Phase 4: Audio Playback, UI, and Offline Support**

*   **Step 9: Securely Store and Stream Audio Tracks:**
    *   **Task:** Upload compressed audio tracks to Firebase Storage. Implement Firebase Storage security rules to restrict access based on user authentication.
    *   **Code Implementation (AI Editor):**
        *   (No direct code implementation in the AI editor for uploading files. This is a manual step in the Firebase console. However, the AI coder should implement audio fetching in the app).
        *   Write a function `getAudioUrl` that takes a track ID and returns the download URL from Firebase Storage.

*   **Step 10: Create Audio Player Component with Progress Tracking:**
    *   **Task:** Enhance the `expo-av` based audio player component. Add a progress bar, timer, and handle different playback states.
    *   **Code Implementation (AI Editor):**
        *   Use the `expo-av` library to create an `Audio.Sound` object.
        *   Implement functions to `play`, `pause`, and `stop` the audio.
        *   Use `setOnPlaybackStatusUpdate` to track playback progress and update the UI (progress bar, timer).
        *   Disable fast forward and rewind functionality.
        *   Style the component using Tamagui.

*   **Step 11: Display Weekly Plan with Offline Support:**
    *   **Task:** Create a screen to display the user's current weekly plan. Fetch the plan data from Firestore. Enable Firestore offline persistence.
    *   **Code Implementation (AI Editor):**
        *   Create a UI component to display the weekly plan using Tamagui.
        *   Fetch the plan data from Firestore using `getDocs` or `onSnapshot` (for real-time updates).
        *   Handle loading and empty states gracefully.
        *   Implement UI elements to indicate offline status and handle reconnection.

*   **Step 12: Implement Emotion Selection with Visual Cues:**
    *   **Task:** Create a screen where users can select their current emotional state. Use visual icons or emojis along with text labels.
    *   **Code Implementation (AI Editor):**
        *   Design the UI for the emotion selection screen using Tamagui components.
        *   Use a combination of icons/emojis and text labels for each emotional state.
        *   Ensure accessibility for screen readers.
        *   Store the selected emotional state in Zustand and potentially update Firestore (triggering the Cloud Function).

*   **Step 13: Update Weekly Plan Based on Emotion (Cloud Function Trigger):**
    *   **Task:** Modify the Cloud Function to be triggered when a user updates their emotional state in Firestore.
    *   **Code Implementation (AI Editor):**
        *   Modify the Cloud Function created in Step 7 to use the `onUpdate` or `onCreate` trigger for the relevant Firestore document (e.g., a document in a `userEmotions` collection where you store the user's current emotional state).
        *   The updated function should re-evaluate the coaching rules and potentially update the current day's plan or the rest of the weekly plan.

**Phase 5: User History, Profile, and Localization**

*   **Step 14: Store Listening History in Batches:**
    *   **Task:** Each time a user listens to an audio track, store a record of it in Firestore. Use batched writes to group multiple listening history entries.
    *   **Code Implementation (AI Editor):**
        *   Create a function `storeListeningHistory` that takes the user ID, track ID, function, and timestamp as input.
        *   Use a batched write to add a new document to the `history` subcollection under the user's document in Firestore.
        *   Consider adding a mechanism to periodically flush the batch (e.g., after every 5 entries or after a certain time interval).

    *   **Example Code Snippet (AI Editor - Batched Writes):**

        ```typescript
        import { db } from '../../config/firebase';
        import { doc, writeBatch, serverTimestamp } from 'firebase/firestore';

        const storeListeningHistory = async (userId: string, trackId: string, functionName: string) => {
          const batch = writeBatch(db);
          const historyRef = doc(db, 'users', userId).collection('history');

          // Add a new history entry to the batch
          batch.set(historyRef.doc(), {
            trackId: trackId,
            function: functionName,
            timestamp: serverTimestamp(),
          });

          // ... (Potentially add more entries to the batch) ...

          // Commit the batch
          try {
              await batch.commit();
          } catch (error) {
            console.error("Error storing listening history:", error);
          }

        };
        ```

*   **Step 15: Create History Screen:**
    *   **Task:** Design a screen that displays the user's listening history, showing the last 3 tracks listened to for each function.
    *   **Code Implementation (AI Editor):**
        *   Create a UI component using Tamagui to display the history.
        *   Fetch the user's listening history from Firestore, limiting the results and ordering by timestamp.
        *   Display the function name, track title, and duration for each entry.

*   **Step 16: Create Profile Screen with Language Selection:**
    *   **Task:** Create a profile screen displaying user information. Allow users to update their profile and select their preferred language.
    *   **Code Implementation (AI Editor):**
        *   Create a UI component for the profile screen using Tamagui.
        *   Fetch user data from Firebase Authentication and Firestore.
        *   Use a library like `i18n-js` or `expo-localization` to manage translations.
        *   Provide a dropdown or other selection mechanism for the user to choose their preferred language.
        *   Store the selected language preference in Firestore under the user's document.
        *   Update your app's components to use the selected language for text display.

**Phase 6: Payment Integration and Monitoring**

*   **Step 17: Integrate a Payment Gateway with Cloud Functions:**
    *   **Task:** Choose a payment gateway (e.g., Stripe, RevenueCat) and integrate its React Native SDK. Create a payment screen. Use Firebase Cloud Functions to handle payment webhooks.
    *   **Code Implementation (AI Editor):**
        *   Install the necessary SDK for your chosen payment gateway.
        *   Create a UI component for the payment screen using Tamagui.
        *   Implement functions to initiate the payment flow using the payment gateway's SDK.
        *   Create Firebase Cloud Functions to handle webhooks from the payment gateway (e.g., to process successful payments, subscription renewals, cancellations).
        *   Securely store the user's payment status or subscription information in Firestore.

*   **Step 18: Implement Monitoring and Analytics:**
    *   **Task:** Integrate Firebase Crashlytics for crash reporting and Firebase Analytics to track user engagement.
    *   **Code Implementation (AI Editor):**
        *   Install the necessary Firebase SDKs for Crashlytics and Analytics.
        *   Initialize Crashlytics and Analytics in your app's entry point.
        *   Log custom events and user properties in Firebase Analytics to track specific actions and user segments.

**Manual Setup Steps (Outside the AI Editor):**

1. **Firebase Console:**
    *   Create a Firebase project.
    *   Enable Authentication (Email/Password, Google, Apple, Facebook).
    *   Create Firestore database and set up collections (`users`, `coachingRules`, etc.).
    *   Configure Firebase Storage and set up security rules.
    *   Set up Firebase Cloud Functions.
    *   Enable Crashlytics and Analytics.

2. **Facebook Developer Portal:**
    *   Create a Facebook app.
    *   Add "Facebook Login" to your app.
    *   Configure OAuth Redirect URIs.
    *   Obtain your App ID and App Secret.

3. **Apple Developer Portal:**
    *   Ensure you have an Apple Developer account.
    *   You'll need to configure your app to use Apple Sign In.

4. **Payment Gateway:**
    *   Create an account with your chosen payment gateway (Stripe, RevenueCat, etc.).
    *   Configure API keys and webhooks.

5. **Audio File Upload:**
    *   Compress and upload audio tracks to Firebase Storage.

**AI Coder Focus:**

The AI coder will primarily focus on the following:

*   Writing TypeScript code for React Native components using the Expo framework and Tamagui library.
*   Implementing Firebase SDK functions for Authentication, Firestore, and Storage interactions.
*   Writing Firebase Cloud Functions in TypeScript.
*   Implementing state management using Zustand.
*   Ensuring code quality, readability, and maintainability.
*   Handling errors gracefully and providing appropriate UI feedback to the user.
*   Implementing accessibility features.
*   Writing unit tests when appropriate.

This comprehensive plan, with its clear separation of AI coder tasks and manual setup steps, should provide a solid foundation for building your mental health app. Remember that this is an iterative process, and you may need to make adjustments along the way based on testing and feedback.

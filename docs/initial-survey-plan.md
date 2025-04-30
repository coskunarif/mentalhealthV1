# Plan: Integrate Initial Survey Post-Registration

This plan outlines the steps to modify the mobile app so that a survey appears mandatorily after user registration, replacing the current separate survey screen accessible from the home page. The existing 'daily' survey template will be used for this initial survey.

## 1. Update Data Model

*   **File:** `app/models/user.model.ts`
*   **Action:** Add a new boolean field `initialSurveyCompleted` to the `UserModel` interface. This field will track whether the user has completed the mandatory survey after registration.

```typescript
export interface UserModel {
  // ... existing fields ...
  initialSurveyCompleted: boolean; // <-- ADD THIS LINE
  // ... other existing fields ...
}
```

## 2. Initialize New Field in Backend

*   **File:** `firebase/functions/src/auth/onUserCreate.ts` (or equivalent function responsible for creating the Firestore user document)
*   **Action:** Modify the cloud function to ensure the `initialSurveyCompleted` field is explicitly set to `false` when a new user document is created in Firestore upon successful authentication registration.

## 3. Modify Sign-Up Navigation

*   **File:** `app/auth/sign-up.tsx`
*   **Action:** Change the navigation target upon successful sign-up. Instead of navigating directly to the home screen (`/tabs/home`), navigate the user to the survey screen (`/survey`).
*   **Change:** Modify the line `router.replace('/tabs/home');` to `router.replace('/survey');` within the `handleSignUp` function's success block.

## 4. Update User Profile on Survey Completion

*   **File:** `app/services/user.service.ts`
*   **Action:** Add a new static async function, `markInitialSurveyComplete(userId: string)`, responsible for updating the specific user's document in Firestore by setting the `initialSurveyCompleted` field to `true`. It should also update the `updatedAt` timestamp.

```typescript
// Example structure in UserService
static async markInitialSurveyComplete(userId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    initialSurveyCompleted: true,
    updatedAt: new Date()
  });
}
```

*   **File:** `app/survey.tsx`
*   **Action:** After the `submitSurvey` hook (from `useSurvey`) returns successfully within the `handleNext` function (specifically when it's the last question), call the newly created `UserService.markInitialSurveyComplete(userId)` function *before* navigating the user to the home screen. Include error handling for the profile update.

```typescript
// Inside handleNext, within the 'if (success)' block
if (success) {
  try {
    await UserService.markInitialSurveyComplete(userId);
    console.log('Initial survey completion marked.');
  } catch (updateError) {
    console.error('Failed to mark initial survey complete:', updateError);
    // Consider logging this error or informing the user
  }
  router.replace('/tabs/home'); // Navigate home after update attempt
}
```

## 5. Implement Conditional Navigation in Root Layout

*   **File:** `app/_layout.tsx`
*   **Action:** Modify the main navigation logic within the `ThemedApp` component's `useEffect` hook that handles routing based on authentication state.
*   **Change:** When the user is authenticated (`if (user)`), add a check for `user.initialSurveyCompleted`.
    *   If `true`, navigate to `/tabs/home`.
    *   If `false` (or the field doesn't exist yet for safety), navigate to `/survey`.

```typescript
// Inside the navigation useEffect hook in app/_layout.tsx
if (loaded && initialized && !loading) {
  if (user) {
    // Check the new flag from the user object (ensure it's loaded via AuthProvider)
    if (user.initialSurveyCompleted) {
      router.replace('/tabs/home');
    } else {
      router.replace('/survey'); // Force survey if not completed
    }
  } else {
    router.replace('/auth/sign-in');
  }
}
```

## 6. Modify Quick Actions Button

*   **File:** `app/components/QuickActions.tsx`
*   **Action:** Keep the visual representation of the first button (originally "Take Survey") but remove its label and navigation functionality.
    1.  Modify the `actions` array: Make `title` and `href` optional. Remove these properties from the first action object.
    2.  Update the rendering logic: Use conditional rendering (`action.href ? ... : ...`) to render a functional `Link` component only if `action.href` exists. Otherwise, render a non-functional `TouchableOpacity`. Conditionally render the `Text` label only if `action.title` exists.

*   **Code Changes:**
    *   **Update `actions` array:**
        ```typescript
        const actions: {
          title?: string; // Optional
          icon: MaterialIconName;
          href?: string; // Optional
          color: string;
        }[] = [
          { icon: 'assignment', color: '#5DA47A' }, // No title or href
          { title: 'Track Mood', icon: 'mood', href: '/mood', color: '#5DA47A' },
        ];
        ```
    *   **Update rendering logic:** Implement conditional rendering for `Link`/`TouchableOpacity` and the label `Text`.

## Flow Diagram

```mermaid
graph TD
    subgraph Registration & Initial Login Flow
        A[User Registers] --> B(Sign Up Screen);
        B -- Success --> C[Cloud Function: onUserCreate];
        C -- Creates User Doc --> D[Firestore User Doc (initialSurveyCompleted = false)];
        B -- Navigates --> E[Survey Screen];
        E -- Submits Survey --> F[Survey Hook];
        F -- Saves Response --> G[Firestore Survey Response];
        E -- Updates Profile --> H[User Service: markInitialSurveyComplete];
        H -- Sets Flag --> I[Firestore User Doc (initialSurveyCompleted = true)];
        E -- Navigates --> J[Home Screen];
    end

    subgraph Subsequent Logins / App Open
        K[User Opens App] --> L[Root Layout];
        L -- Auth Check --> M{User Authenticated?};
        M -- Yes --> N{Initial Survey Complete?};
        M -- No --> O[Auth Screen];
        N -- No --> E;  // Force survey if not complete
        N -- Yes --> J; // Go home if complete
    end

    subgraph Home Screen UI Change
        J -- Contains --> P[Quick Actions Component];
        P -- (Button modified: no label/link) --> Q((Placeholder Icon));
    end

    style D fill:#f9f,stroke:#333,stroke-width:2px
    style I fill:#ccf,stroke:#333,stroke-width:2px
    style G fill:#eee,stroke:#333,stroke-width:1px
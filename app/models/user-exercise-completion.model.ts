// Model for userExerciseCompletions collection
export interface UserExerciseCompletion {
  userId: string;
  exerciseId: string;
  templateId: string;
  completedAt: Date; // Use Date or Firestore Timestamp as appropriate
}

export default {};

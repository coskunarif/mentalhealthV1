// Model for userTemplateCompletions collection
export interface UserTemplateCompletion {
  userId: string;
  templateId: string;
  completedAt: Date; // Use Date or Firestore Timestamp as appropriate
  exercisesCompleted: number;
  totalExercises: number;
}

export default {};

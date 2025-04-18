// Function Category Model
export interface ExerciseCategory {
  id: string; // Matches document ID
  name: string; // Display name
  description: string;
  consciousnessRange: {
    min: number;
    max: number;
  };
  order: number; // For sorting
}


export default {};

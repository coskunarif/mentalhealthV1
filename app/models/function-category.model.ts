// Function Category Model
export interface FunctionCategory {
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

// Exercise model
export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  order: number;
  audioUrl: string;
  // Updated: exerciseCategories is now a single string reference to a category ID
  exerciseCategories: string;
}


export default {};

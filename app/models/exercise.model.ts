// Exercise model
export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  order: number;
  audioUrl: string;
  // New: exerciseCategories object with category impact scores
  exerciseCategories: {
    supportDreams?: number;
    balanceMemories?: number;
    gainAwareness?: number;
    changeOpinion?: number;
    breatheUp?: number;
  };
}


export default {};

export const formatMeditationId = (id: string): string => {
  return id.toLowerCase().replace(/\s+/g, '');
};

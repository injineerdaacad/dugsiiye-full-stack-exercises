export const nextId = (existingIds = []) => {
  if (!existingIds.length) return 1;
  return Math.max(...existingIds) + 1;
};
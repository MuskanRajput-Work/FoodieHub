export const STEPS = ['Placed', 'Preparing', 'Out for delivery', 'Delivered'];

export function getStage(createdAt) {
  const mins = (Date.now() - new Date(createdAt).getTime()) / 60000;
  if (mins < 1) return 0;
  if (mins < 3) return 1;
  if (mins < 6) return 2;
  return 3;
}
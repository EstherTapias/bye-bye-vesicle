export const SURGERY_DATE = new Date("2026-06-22T00:00:00");

export function getCurrentDay(startDate = SURGERY_DATE) {
  const today = new Date();
  const start = new Date(startDate);
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;

  if (diffDays < 1) return 0;   // before surgery
  if (diffDays > 30) return 31; // recovery complete
  return diffDays;              // 1..30
}

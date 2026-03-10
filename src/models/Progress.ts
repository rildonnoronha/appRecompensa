export type WeeklyProgress = {
  totalActivities: number;
  completedActivities: number;
  percentage: number; // 0-100
};

export type MonthlyProgress = {
  totalWeeks: number;
  completedWeeks: number;
  percentage: number; // 0-100
  rewardValue: number; // 0-100 (R$)
};

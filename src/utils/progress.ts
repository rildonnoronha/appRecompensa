import type { Activity } from "../models/Activity";
import type { MonthlyProgress, WeeklyProgress } from "../models/Progress";

export function calcWeeklyProgress(activities: Activity[]): WeeklyProgress {
  const totalActivities = activities.length;
  const completedActivities = activities.filter((a) => a.completed).length;
  const percentage =
    totalActivities === 0
      ? 0
      : Math.round((completedActivities / totalActivities) * 100);

  return { totalActivities, completedActivities, percentage };
}

export function calcMonthlyRewardValue(percentage: number): number {
  // Rule: 100% => R$100; proportional for lower percentages
  return Math.round(Math.max(0, Math.min(100, percentage)));
}

export function calcMonthlyProgressFromWeeks(params: {
  totalWeeks: number;
  completedWeeks: number;
}): MonthlyProgress {
  const { totalWeeks, completedWeeks } = params;
  const percentage =
    totalWeeks === 0
      ? 0
      : Math.round((completedWeeks / totalWeeks) * 100);
  const rewardValue = calcMonthlyRewardValue(percentage);
  return { totalWeeks, completedWeeks, percentage, rewardValue };
}

import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { Trophy } from "lucide-react-native";
import type { Activity } from "../models/Activity";
import type { MonthlyProgress } from "../models/Progress";
import { getJSON, setJSON } from "../storage/storage";
import { STORAGE_KEYS } from "../storage/keys";
import {
  calcMonthlyProgressFromWeeks,
  calcWeeklyProgress,
} from "../utils/progress";

export function MonthlyProgressScreen() {
  const [loading, setLoading] = useState(true);
  const [monthly, setMonthly] = useState<MonthlyProgress>({
    totalWeeks: 4,
    completedWeeks: 0,
    percentage: 0,
    rewardValue: 0,
  });

  useEffect(() => {
    (async () => {
      const stored = await getJSON<MonthlyProgress>(
        STORAGE_KEYS.MONTHLY_PROGRESS
      );
      if (stored) {
        setMonthly(stored);
        setLoading(false);
        return;
      }

      // Derive initial monthly progress from current weekly activities.
      // Note: this is a base implementation — it treats the current week as the
      // only week and stores the result. Subsequent loads will use the stored value.
      const activities =
        (await getJSON<Activity[]>(STORAGE_KEYS.ACTIVITIES)) ?? [];
      const wp = calcWeeklyProgress(activities);

      // A week counts as "completed" when >= 80% of activities are done
      const completedWeeks = wp.percentage >= 80 ? 1 : 0;
      const totalWeeks = 4;

      const mp = calcMonthlyProgressFromWeeks({ totalWeeks, completedWeeks });
      await setJSON(STORAGE_KEYS.MONTHLY_PROGRESS, mp);

      setMonthly(mp);
      setLoading(false);
    })();
  }, []);

  const weeksLabel = useMemo(
    () => `Semanas completas: ${monthly.completedWeeks}/${monthly.totalWeeks}`,
    [monthly]
  );

  if (loading) {
    return (
      <View className="flex-1 bg-zinc-50 p-6 justify-center">
        <Text className="text-zinc-700 text-center">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zinc-50 p-6 justify-center">
      <View
        className="bg-white border border-zinc-200 rounded-2xl p-6 items-center"
        style={{ gap: 12 }}
      >
        <Trophy color="#f59e0b" size={36} />
        <Text className="text-zinc-900 font-extrabold text-xl">
          Progresso do mês
        </Text>

        <Text className="text-zinc-600">{weeksLabel}</Text>

        <View className="w-full bg-zinc-100 rounded-full overflow-hidden h-3">
          <View
            className="h-3 bg-amber-400"
            style={{ width: `${monthly.percentage}%` }}
          />
        </View>

        <Text className="text-zinc-900 font-bold" style={{ marginTop: 8 }}>
          {monthly.percentage}% • Recompensa: R${monthly.rewardValue}
        </Text>

        <Text className="text-xs text-zinc-500 text-center">
          Regra: 100% = R$100, valor proporcional para percentuais menores.
        </Text>
      </View>
    </View>
  );
}

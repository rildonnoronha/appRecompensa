import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ActivityItem } from "../components/ActivityItem";
import { ProgressBar } from "../components/ProgressBar";
import type { Activity } from "../models/Activity";
import type { WeeklyProgress } from "../models/Progress";
import { getWeekday1to5, formatWeekdayPT } from "../utils/date";
import { calcWeeklyProgress } from "../utils/progress";
import { seedActivities } from "../utils/seed";
import { STORAGE_KEYS } from "../storage/keys";
import { getJSON, setJSON } from "../storage/storage";
import type { RootStackParamList } from "../navigation/AppNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList, "Dashboard">;

export function DashboardScreen() {
  const navigation = useNavigation<Nav>();

  const today = useMemo(() => getWeekday1to5(new Date()), []);
  const [loading, setLoading] = useState(true);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress>({
    totalActivities: 0,
    completedActivities: 0,
    percentage: 0,
  });

  const todaysActivities = useMemo(
    () => activities.filter((a) => a.dayOfWeek === today),
    [activities, today]
  );

  const rewardUnlocked = weeklyProgress.percentage >= 80;

  useEffect(() => {
    (async () => {
      const stored = await getJSON<Activity[]>(STORAGE_KEYS.ACTIVITIES);

      const initial = stored ?? seedActivities();
      setActivities(initial);

      const wp = calcWeeklyProgress(initial);
      setWeeklyProgress(wp);

      if (!stored) {
        await setJSON(STORAGE_KEYS.ACTIVITIES, initial);
        await setJSON(STORAGE_KEYS.WEEKLY_PROGRESS, wp);
      }

      setLoading(false);
    })();
  }, []);

  async function persistAll(nextActivities: Activity[]) {
    const wp = calcWeeklyProgress(nextActivities);
    setWeeklyProgress(wp);

    await setJSON(STORAGE_KEYS.ACTIVITIES, nextActivities);
    await setJSON(STORAGE_KEYS.WEEKLY_PROGRESS, wp);
  }

  async function toggleActivity(id: string) {
    const next = activities.map((a) =>
      a.id === id ? { ...a, completed: !a.completed } : a
    );
    setActivities(next);
    await persistAll(next);
  }

  function openReward() {
    // Alternates prize type by day: even days (Tue=2, Thu=4) → Cinema; odd days (Mon=1, Wed=3, Fri=5) → Sorvete
    const rewardType = today % 2 === 0 ? "Cinema" : "Sorvete";
    navigation.navigate("Reward", { rewardType });
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-50">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-zinc-50"
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <View className="bg-white rounded-xl p-4 border border-zinc-200">
        <Text className="text-zinc-900 font-bold text-lg">
          Hoje: {formatWeekdayPT(today)}
        </Text>
        <Text className="text-zinc-500 mt-1">
          Complete as atividades para ganhar recompensas.
        </Text>
      </View>

      <ProgressBar
        label="Progresso semanal"
        percentage={weeklyProgress.percentage}
      />

      <View style={{ gap: 12 }}>
        <Text className="text-zinc-800 font-bold">Atividades de hoje</Text>

        {todaysActivities.length === 0 ? (
          <View className="bg-white rounded-xl p-4 border border-zinc-200">
            <Text className="text-zinc-600">
              Sem atividades cadastradas para hoje.
            </Text>
          </View>
        ) : (
          todaysActivities.map((a) => (
            <ActivityItem key={a.id} activity={a} onToggle={toggleActivity} />
          ))
        )}
      </View>

      <View style={{ gap: 12 }}>
        <Pressable
          onPress={() => navigation.navigate("MonthlyProgress")}
          className="bg-zinc-900 rounded-xl p-4"
        >
          <Text className="text-white font-semibold text-center">
            Ver Progresso do Mês
          </Text>
        </Pressable>

        <Pressable
          disabled={!rewardUnlocked}
          onPress={openReward}
          className={`${
            rewardUnlocked ? "bg-green-600" : "bg-zinc-300"
          } rounded-xl p-4`}
        >
          <Text
            className={`${
              rewardUnlocked ? "text-white" : "text-zinc-600"
            } font-semibold text-center`}
          >
            Cupom de Recompensa {rewardUnlocked ? "🎉" : "(>= 80%)"}
          </Text>
        </Pressable>

        {!rewardUnlocked && (
          <Text className="text-xs text-zinc-500 text-center">
            Complete pelo menos 80% das atividades da semana para liberar o cupom.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

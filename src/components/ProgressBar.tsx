import React from "react";
import { View, Text } from "react-native";

type Props = {
  label: string;
  percentage: number; // 0-100
};

export function ProgressBar({ label, percentage }: Props) {
  const safe = Math.max(0, Math.min(100, percentage));

  return (
    <View className="bg-white rounded-xl p-4 border border-zinc-200">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-zinc-800 font-semibold">{label}</Text>
        <Text className="text-zinc-600">{safe}%</Text>
      </View>

      <View className="h-3 bg-zinc-100 rounded-full overflow-hidden">
        <View className="h-3 bg-green-500" style={{ width: `${safe}%` }} />
      </View>
    </View>
  );
}

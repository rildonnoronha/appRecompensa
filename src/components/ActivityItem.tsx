import React from "react";
import { Pressable, Text, View } from "react-native";
import { CheckSquare2, Square } from "lucide-react-native";
import type { Activity } from "../models/Activity";

type Props = {
  activity: Activity;
  onToggle: (id: string) => void;
};

export function ActivityItem({ activity, onToggle }: Props) {
  return (
    <Pressable
      onPress={() => onToggle(activity.id)}
      className="bg-white border border-zinc-200 rounded-xl p-4 flex-row items-start gap-3"
    >
      <View className="pt-0.5">
        {activity.completed ? (
          <CheckSquare2 color="#22c55e" size={22} />
        ) : (
          <Square color="#71717a" size={22} />
        )}
      </View>

      <View className="flex-1">
        <Text className="text-xs text-zinc-500 mb-1">{activity.subject}</Text>
        <Text
          className={`text-zinc-900 font-semibold ${
            activity.completed ? "line-through text-zinc-400" : ""
          }`}
        >
          {activity.title}
        </Text>
      </View>
    </Pressable>
  );
}

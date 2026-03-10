import React from "react";
import { View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Gift, IceCream, Popcorn } from "lucide-react-native";
import type { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Reward">;

export function RewardScreen({ route }: Props) {
  const { rewardType } = route.params;

  const Icon = rewardType === "Cinema" ? Popcorn : IceCream;

  return (
    <View className="flex-1 bg-zinc-50 p-6 justify-center">
      <View className="bg-white border border-zinc-200 rounded-2xl p-6 items-center" style={{ gap: 12 }}>
        <Gift color="#16a34a" size={34} />
        <Text className="text-zinc-900 font-extrabold text-xl">Parabéns!</Text>
        <Text className="text-zinc-600 text-center">
          Você atingiu a meta semanal e ganhou um cupom de:
        </Text>

        <View className="flex-row items-center" style={{ gap: 8, marginTop: 8 }}>
          <Icon color="#0f172a" size={22} />
          <Text className="text-zinc-900 font-bold text-lg">{rewardType}</Text>
        </View>

        <Text className="text-xs text-zinc-500 text-center" style={{ marginTop: 16 }}>
          Dica: você pode combinar com os pais qual será o prêmio da semana.
        </Text>
      </View>
    </View>
  );
}

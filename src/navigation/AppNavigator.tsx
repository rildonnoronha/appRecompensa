import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardScreen } from "../screens/DashboardScreen";
import { RewardScreen } from "../screens/RewardScreen";
import { MonthlyProgressScreen } from "../screens/MonthlyProgressScreen";

export type RootStackParamList = {
  Dashboard: undefined;
  Reward: { rewardType: "Cinema" | "Sorvete" };
  MonthlyProgress: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: "Recompensas" }}
      />
      <Stack.Screen
        name="Reward"
        component={RewardScreen}
        options={{ title: "Cupom" }}
      />
      <Stack.Screen
        name="MonthlyProgress"
        component={MonthlyProgressScreen}
        options={{ title: "Progresso do Mês" }}
      />
    </Stack.Navigator>
  );
}

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { AppearanceSettings, LocalizationSettings } from "../screens";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Back"
          component={TabNavigator}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Appearance Settings"
          component={AppearanceSettings}
        ></Stack.Screen>
        <Stack.Screen
          name="Localization Settings"
          component={LocalizationSettings}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

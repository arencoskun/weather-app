import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomeScreen, SearchScreen, SettingsScreen } from "../screens";
export type TabNavigatorParamList = {
  Home: { latitude: number | undefined; longitude: number | undefined };
  Search: undefined;
  Settings: undefined;
};
const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        initialParams={{ latitude: 0, longitude: 0 }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={SearchScreen}
        name="Search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={SettingsScreen}
        name="Settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

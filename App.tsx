import React from "react";
import { StyleSheet } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.otf"),
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

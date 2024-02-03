import { View, Text } from "react-native";
import SettingsCategory from "../components/SettingsCategory";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SettingsCategory
        title="Appearance"
        index={0}
        targetScene="Appearance Settings"
      ></SettingsCategory>
      <SettingsCategory
        title="Localization"
        index={1}
        targetScene="Localization Settings"
      ></SettingsCategory>
    </View>
  );
}

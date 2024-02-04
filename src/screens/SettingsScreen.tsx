import { View, Text } from "react-native";
import Category from "../components/Category";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Category
        title="Appearance"
        index={0}
        targetScene="Appearance Settings"
      ></Category>
      <Category
        title="Localization"
        index={1}
        targetScene="Localization Settings"
      ></Category>
    </View>
  );
}

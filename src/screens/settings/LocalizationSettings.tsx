import { Button, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LocalizationSettings() {
  const navigator = useNavigation<any>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Localization Settings</Text>
      <Button
        title="Click me"
        onPress={() => navigator.navigate("Home")}
      ></Button>
    </View>
  );
}

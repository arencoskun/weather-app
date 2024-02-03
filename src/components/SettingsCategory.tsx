import { PropsWithoutRef } from "react";
import { Text, View } from "react-native";
import { PressableOpacity } from "react-native-pressable-opacity";
import { useNavigation } from "@react-navigation/native";

interface SettingsCategoryProps extends PropsWithoutRef<{}> {
  title: string;
  index: number;
  targetScene: string;
}

export default function SettingsCategory({
  title,
  index,
  targetScene,
  ...props
}: SettingsCategoryProps) {
  const navigator = useNavigation<any>();
  return (
    <PressableOpacity
      style={{
        backgroundColor: "#c9c7c7",
        width: "97%",
        height: 60,
        borderRadius: 10,
        position: "absolute",
        top: 20 + 70 * index,
        left: 5,
      }}
      onPress={() => navigator.navigate(targetScene)}
    >
      <View style={{ width: "100%", height: "100%" }}>
        <Text
          style={{
            fontSize: 24,
            marginLeft: 20,
            position: "relative",
            top: "25%",
            fontFamily: "Inter-Light",
          }}
        >
          {title}
        </Text>
      </View>
    </PressableOpacity>
  );
}

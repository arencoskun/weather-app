import { PropsWithoutRef } from "react";
import { Text, View } from "react-native";
import { PressableOpacity } from "react-native-pressable-opacity";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

interface SettingsCategoryProps extends PropsWithoutRef<{}> {
  title: string;
  index: number;
  targetScene: string;
}

export default function Category({
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
        height: 60,
        width: "97%",
        borderRadius: 10,
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

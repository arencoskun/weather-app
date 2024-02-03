import { PropsWithoutRef } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { weatherCodes } from "../utils";

interface SecondaryWeatherCard extends PropsWithoutRef<{}> {
  day: string;
  temperature: string;
  unit: string;
  weather_code: string;
  is_day: number;
}

export function SecondaryWeatherCard({
  day,
  temperature,
  unit,
  weather_code,
  is_day,
  ...props
}: SecondaryWeatherCard) {
  return (
    <View
      style={{
        backgroundColor: "#c9c7c7",
        borderRadius: 10,
        marginLeft: 10,
      }}
    >
      <View style={{ width: "100%", height: "100%" }}>
        <Image
          style={{
            width: 50,
            height: 50,
            alignSelf: "center",
          }}
          source={{
            uri: `https://openweathermap.org/img/wn/${
              weatherCodes[parseInt(weather_code)] + (is_day === 1 ? "d" : "n")
            }@2x.png`,
          }}
        />
        <View
          style={{
            width: "100%",
            height: "60%",
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter-Light",
              fontSize: 14,
              alignSelf: "center",
            }}
          >
            {temperature}
            {unit}
          </Text>
          <Text style={{ fontFamily: "Inter-Light", fontSize: 14 }}>{day}</Text>
        </View>
      </View>
    </View>
  );
}

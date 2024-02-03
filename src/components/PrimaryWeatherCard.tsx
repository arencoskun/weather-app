import { PropsWithoutRef } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { weatherCodes } from "../utils";

interface PrimaryWeatherCardProps extends PropsWithoutRef<{}> {
  location: string;
  time: string;
  temperature: number;
  unit: string;
  weather_code: string;
  is_day: number;
}

export function PrimaryWeatherCard({
  location,
  time,
  temperature,
  unit,
  weather_code,
  is_day,
  ...props
}: PrimaryWeatherCardProps) {
  return (
    <View
      style={{
        backgroundColor: "#c9c7c7",
        width: "50%",
        height: "30%",
        borderRadius: 10,
        padding: 5,
      }}
    >
      <Image
        style={{
          width: 75,
          height: 75,
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
          flex: 1,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter-Light",
            fontSize: 24,
            alignSelf: "center",
          }}
        >
          {temperature}
          {unit}
        </Text>
        <Text style={{ fontFamily: "Inter-Light", fontSize: 18 }}>
          {location}
        </Text>
        <Text style={{ fontFamily: "Inter-Light", fontSize: 14 }}>
          Last updated: {time}
        </Text>
      </View>
    </View>
  );
}

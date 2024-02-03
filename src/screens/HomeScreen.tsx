import { Button, View, Text, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { PrimaryWeatherCard } from "../components/PrimaryWeatherCard";
import { SecondaryWeatherCard } from "../components/SecondaryWeatherCard";

interface OpenMeteoResponseInterface {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    time: string;
    weather_code: string;
    is_day: number;
  };
  current_units: {
    temperature_2m: string;
  };
  daily: {
    time: Array<string>;
    weather_code: Array<number>;
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
  };
}

export default function HomeScreen() {
  const [responseObject, setResponseObject] =
    useState<OpenMeteoResponseInterface>();

  const [location, setLocation] = useState<string>("Waiting...");
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await getCurrentPositionAsync({});

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&current=temperature_2m,weather_code,apparent_temperature,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      axios.get(url).then((response) => {
        setResponseObject(response.data);
        console.log(response.data);
      });

      let regionName = await reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLocation(regionName[0].city!);
      console.log(regionName);
    })();
  }, []);

  const navigator = useNavigation<any>();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {/* <Text style={{ fontSize: 24 }}>         
        Current temperature: {responseObject?.current.temperature_2m}{" "}
        {responseObject?.current_units.temperature_2m}
      </Text>
      <Text style={{ fontSize: 24 }}>Time: {responseObject?.current.time}</Text>
      <Text>{errorMsg}</Text> */}
      <PrimaryWeatherCard
        temperature={responseObject?.current.temperature_2m!}
        unit={responseObject?.current_units.temperature_2m!}
        location={location}
        time={responseObject?.current.time!.split("T")[1]!}
        weather_code={responseObject?.current.weather_code!}
        is_day={responseObject?.current.is_day!}
      />
      {/* <View style={{ }}> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          width: "100%",
          maxHeight: 100,
          alignSelf: "flex-start",
        }}
      >
        {responseObject?.daily.time.map((day, i) => (
          <SecondaryWeatherCard
            key={i}
            day={new Date(day).toDateString()}
            temperature={
              responseObject?.daily.temperature_2m_min[i] +
              responseObject?.current_units.temperature_2m! +
              " - " +
              responseObject?.daily.temperature_2m_max[i]
            }
            unit={responseObject?.current_units.temperature_2m!}
            weather_code={responseObject.daily.weather_code![i].toString()}
            is_day={responseObject?.current.is_day!}
          />
        ))}
      </ScrollView>
    </View>
  );
}

import { View, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { PrimaryWeatherCard } from "../components/PrimaryWeatherCard";
import { SecondaryWeatherCard } from "../components/SecondaryWeatherCard";
import { OpenMeteoResponseInterface, makeApiRequest } from "../utils";

export default function HomeScreen() {
  const [responseObject, setResponseObject] =
    useState<OpenMeteoResponseInterface>();

  const [location, setLocation] = useState<string>("Waiting...");

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await getCurrentPositionAsync({});

      makeApiRequest(
        location.coords.latitude,
        location.coords.longitude,
        setResponseObject
      );

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
      <PrimaryWeatherCard
        temperature={responseObject?.current.temperature_2m!}
        unit={responseObject?.current_units.temperature_2m!}
        location={location}
        time={responseObject?.current.time!.split("T")[1]!}
        weather_code={responseObject?.current.weather_code!}
        is_day={responseObject?.current.is_day!}
      />
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

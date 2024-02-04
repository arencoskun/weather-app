import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  LocationObject,
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
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [location, setLocation] = useState<string>("Waiting...");
  const [locationObject, setLocationObject] = useState<LocationObject>();

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      setLocationObject(await getCurrentPositionAsync({}));

      makeApiRequest(
        locationObject!.coords.latitude,
        locationObject!.coords.longitude,
        setResponseObject,
        setLoading
      );

      let regionName = await reverseGeocodeAsync({
        latitude: locationObject!.coords.latitude,
        longitude: locationObject!.coords.longitude,
      });

      setLocation(regionName[0].city!);
      console.log(regionName);
    })();
  }, []);

  return loading ? (
    <ActivityIndicator
      style={{ width: "100%", height: "100%" }}
      size={"large"}
    ></ActivityIndicator>
  ) : (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: 20,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setLoading(true);
            makeApiRequest(
              locationObject!.coords.latitude,
              locationObject!.coords.longitude,
              setResponseObject,
              setLoading
            );
          }}
        />
      }
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
    </ScrollView>
  );
}

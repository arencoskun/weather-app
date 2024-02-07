import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { PropsWithoutRef, useEffect, useState } from "react";
import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { PrimaryWeatherCard } from "../components/PrimaryWeatherCard";
import { SecondaryWeatherCard } from "../components/SecondaryWeatherCard";
import { OpenMeteoResponseInterface, makeApiRequest } from "../utils";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { TabNavigatorParamList } from "../navigation/TabNavigator";

export default function HomeScreen({
  route,
  navigation,
}: BottomTabScreenProps<TabNavigatorParamList, "Home">) {
  const [responseObject, setResponseObject] =
    useState<OpenMeteoResponseInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [location, setLocation] = useState<string>("Waiting...");
  const [locationObject, setLocationObject] = useState<LocationObject>();

  const isFocused = useIsFocused();

  console.log(route.params.latitude);
  console.log(route.params.longitude);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        console.log("in effect");
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        console.log("got permission");

        if (route.params.latitude !== 0 && route.params.longitude !== 0) {
          makeApiRequest(
            route.params.latitude!,
            route.params.longitude!,
            setResponseObject,
            setLoading
          );

          let regionName = await reverseGeocodeAsync({
            latitude: route.params.latitude!,
            longitude: route.params.longitude!,
          });

          setLocation(
            regionName[0].district !== null
              ? regionName[0].district!
              : regionName[0].city!
          );
          //setLocationObject(location);
          console.log(regionName);
        } else {
          let location = await getCurrentPositionAsync({});
          makeApiRequest(
            location.coords.latitude,
            location.coords.longitude,
            setResponseObject,
            setLoading
          );

          let regionName = await reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          setLocation(
            regionName[0].district !== null
              ? regionName[0].district!
              : regionName[0].city!
          );
          setLocationObject(location);
          console.log(regionName);
        }
      })();
    }
  }, [isFocused]);

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
              locationObject
                ? locationObject!.coords.latitude
                : route.params.latitude!,
              locationObject
                ? locationObject!.coords.longitude
                : route.params.longitude!,
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

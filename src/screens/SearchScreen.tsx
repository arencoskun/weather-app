import { ScrollView, TextInput, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  CountriesNowResponseInterface,
  makeCountriesNowAPIRequest,
} from "../utils";
import Category from "../components/Category";
import { useScrollToTop } from "@react-navigation/native";

export default function SearchScreen() {
  const [responseObject, setResponseObject] =
    useState<CountriesNowResponseInterface>();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null);

  useScrollToTop(scrollViewRef);

  useEffect(() => {
    (async () => {
      await makeCountriesNowAPIRequest(setResponseObject);
      console.log(responseObject);
    })();
  }, []);

  return (
    <View>
      <TextInput
        style={{
          height: 60,
          backgroundColor: "#c9c7c7",
          borderRadius: 10,
          fontFamily: "Inter-Light",
          fontSize: 24,
          paddingLeft: 5,
          marginHorizontal: 5,
          marginTop: 5,
          marginBottom: 5,
        }}
        placeholder="Search a country..."
        onChangeText={(newSearchFilter: string) => {
          setSearchFilter(newSearchFilter);
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }}
      ></TextInput>
      <ScrollView contentContainerStyle={{ gap: 5 }} ref={scrollViewRef}>
        {responseObject?.data
          .filter((el) =>
            el.country.toLowerCase().includes(searchFilter.toLowerCase())
          )
          .map((el, i) => (
            <Category
              key={i}
              title={el.country}
              index={i}
              targetScene={"Home"}
            />
          ))}
      </ScrollView>
    </View>
  );
}

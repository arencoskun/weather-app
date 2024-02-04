import { ScrollView, TextInput, View, Text, FlatList } from "react-native";
import { useEffect, useRef, useState } from "react";
import React, { useMemo } from "react";
import {
  CountriesNowCitiesResponseInterface,
  CountriesNowResponseInterface,
  makeApiRequest,
  makeCountriesNowAPIRequest,
  makeCountriesNowAPIRequestCities,
} from "../utils";
import Category from "../components/Category";
import { useScrollToTop } from "@react-navigation/native";

export default function SearchScreen() {
  const [responseObject, setResponseObject] =
    useState<CountriesNowResponseInterface>();
  const [responseObjectCities, setResponseObjectCities] =
    useState<CountriesNowCitiesResponseInterface>();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [showingCities, setShowingCities] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  useScrollToTop(flatListRef);

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
        placeholder={"Search a " + (showingCities ? "city..." : "country...")}
        onChangeText={(newSearchFilter: string) => {
          setSearchFilter(newSearchFilter);
          flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }}
        value={searchFilter}
      ></TextInput>
      <View>
        {!showingCities ? (
          <FlatList
            data={responseObject?.data.filter((el) =>
              el.country.toLowerCase().includes(searchFilter.toLowerCase())
            )}
            contentContainerStyle={{ gap: 5 }}
            renderItem={({ item, index }) => (
              <Category
                key={index}
                title={item.country}
                index={index}
                onClick={async () => {
                  await makeCountriesNowAPIRequestCities(
                    item.country.toLowerCase(),
                    setResponseObjectCities
                  );
                  setSearchFilter("");
                  setShowingCities(true);
                }}
              />
            )}
            ref={flatListRef}
          ></FlatList>
        ) : (
          <FlatList
            data={responseObjectCities?.data.filter((el) =>
              el.toLowerCase().includes(searchFilter.toLowerCase())
            )}
            contentContainerStyle={{ gap: 5 }}
            renderItem={({ item, index }) => (
              <Category
                key={index}
                title={item}
                index={index}
                onClick={async () => {
                  setSearchFilter("");
                  setShowingCities(false);
                }}
              />
            )}
            ref={flatListRef}
          ></FlatList>
        )}
        {/* {showingCities
          ? responseObjectCities?.data.map((el, i) => (
              <Category
                key={i}
                title={el}
                index={i}
                onClick={async () => {
                  setShowingCities(false);
                }}
              />
            ))
          : responseObject?.data
              .filter((el) =>
                el.country.toLowerCase().includes(searchFilter.toLowerCase())
              )
              .map((el, i) => (
                
              ))} */}
      </View>
    </View>
  );
}

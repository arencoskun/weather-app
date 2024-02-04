import { ScrollView, Text, TextInput } from "react-native";
import { useEffect, useState } from "react";
import {
  CountriesNowResponseInterface,
  makeCountriesNowAPIRequest,
} from "../utils";
import Category from "../components/Category";

export default function SearchScreen() {
  const [responseObject, setResponseObject] =
    useState<CountriesNowResponseInterface>();
  const [searchFilter, setSearchFilter] = useState<string>("");

  useEffect(() => {
    (async () => {
      await makeCountriesNowAPIRequest(setResponseObject);
      console.log(responseObject);
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ gap: 5 }}>
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
        }}
        placeholder="Search a country..."
        onChangeText={(newSearchFilter: string) =>
          setSearchFilter(newSearchFilter)
        }
      ></TextInput>
      {responseObject?.data
        .filter((el) => el.country.includes(searchFilter))
        .map((el, i) => (
          <Category key={i} title={el.country} index={i} targetScene={"Home"} />
        ))}
    </ScrollView>
  );
}

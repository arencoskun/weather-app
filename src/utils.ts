import axios from "axios";
// import {
//   LocationObject,
//   getCurrentPositionAsync,
//   getLastKnownPositionAsync,

// } from "expo-location";

export const weatherCodes: { [id: number]: string } = {
  0: "01",
  1: "01",
  2: "02",
  3: "03",
  45: "50",
  48: "50",
  51: "10",
  53: "10",
  55: "10",
  56: "10",
  57: "10",
  61: "10",
  63: "10",
  65: "10",
  66: "09",
  67: "09",
  71: "13",
  73: "13",
  75: "13",
  77: "13",
  80: "09",
  81: "09",
  82: "09",
  85: "13",
  86: "13",
  95: "11",
  96: "11",
  99: "11",
};

export interface OpenMeteoResponseInterface {
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

export interface CountriesNowResponseInterface {
  data: Array<CountriesNowResponse>;
}

export interface CountriesNowCitiesResponseInterface {
  data: Array<string>;
}

interface CountriesNowResponse {
  country: string;
  cities: Array<string>;
}

export async function makeApiRequest(
  latitude: number,
  longitude: number,
  setResponseObject: (responseObject: OpenMeteoResponseInterface) => void,
  setLoading: (loading: boolean) => void
) {
  console.log("making api request");
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,apparent_temperature,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  axios.get(url).then((response) => {
    setResponseObject(response.data);
    setLoading(false);
    console.log(response.data);
  });
}

export async function makeCountriesNowAPIRequest(
  setResponseObject: (responseObject: CountriesNowResponseInterface) => void
) {
  console.log("making request");
  const url = `https://countriesnow.space/api/v0.1/countries`;
  axios.get(url).then((response) => {
    console.log("got response");
    console.log(response.data);
    setResponseObject(response.data);
  });
}

export async function makeCountriesNowAPIRequestCities(
  country: string,
  setResponseObject: (
    responseObject: CountriesNowCitiesResponseInterface
  ) => void
) {
  console.log("making request");
  const url = `https://countriesnow.space/api/v0.1/countries/cities`;
  axios.post(url, { country }).then((response) => {
    console.log(response.data);
    setResponseObject(response.data);
  });
}

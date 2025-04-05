import axios from "axios";

import { WeatherInfo } from "../types";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_OW_API_KEY;

const getWeather = async (lat: number, lon: number): Promise<WeatherInfo> =>
  axios
    .get(
      `${BASE_URL}?lat=${lat}&lon=${lon}&exclude=lat,lon,timezone,timezone_offset,minutely,hourly,daily,alerts&units=metric&appid=${API_KEY}`
    )
    .then((response) => response.data);

export default {
  getWeather,
};

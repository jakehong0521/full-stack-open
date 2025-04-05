export interface Country {
  name: Name;
  capital: string[];
  languages: Languages;
  latlng: [number, number];
  area: number;
  flag: string;
  flags: Flags;
}

interface Name {
  common: string;
  official: string;
}

interface Languages {
  [shortenedLang: string]: string;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface WeatherInfo {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

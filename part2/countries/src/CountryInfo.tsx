import { useEffect, useState } from "react";

import weatherService from "./services/weatherService";
import { Country, WeatherInfo as WeatherInfoType } from "./types";
import WeatherInfo from "./WeatherInfo";

type CountryInfoProps = {
  country: Country;
};

const CountryInfo = ({ country }: CountryInfoProps) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoType | null>(null);

  useEffect(() => {
    weatherService
      .getWeather(country.latlng[0], country.latlng[1])
      .then(setWeatherInfo);
  }, [country.latlng]);

  return (
    <div>
      <h2>{country.name.official}</h2>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>

      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(([shortenedLang, lang]) => (
          <li key={shortenedLang}>{lang}</li>
        ))}
      </ul>
      <img height={100} src={country.flags.svg} alt={country.flags.alt} />

      {weatherInfo && (
        <WeatherInfo locationName={country.capital[0]} weather={weatherInfo} />
      )}
    </div>
  );
};

export default CountryInfo;

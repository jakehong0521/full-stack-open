import { WeatherInfo as WeatherInfoType } from "./types";

type WeatherInfoProps = {
  locationName: string;
  weather: WeatherInfoType;
};

const WeatherInfo = ({ locationName, weather }: WeatherInfoProps) => {
  return (
    <div>
      <h3>Weather in {locationName}</h3>
      <div>Temperature {weather.main.temp} Celcius</div>
      <img
        alt={weather.weather[0].main}
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <div>Wind: {weather.wind.speed} m/s</div>
    </div>
  );
};

export default WeatherInfo;

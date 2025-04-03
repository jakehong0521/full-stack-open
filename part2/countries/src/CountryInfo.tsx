import { Country } from "./types";

type CountryInfoProps = {
  country: Country;
};

const CountryInfo = ({ country }: CountryInfoProps) => {
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
    </div>
  );
};

export default CountryInfo;

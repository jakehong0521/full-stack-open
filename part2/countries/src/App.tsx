import { useEffect, useState } from "react";

import CountryInfo from "./CountryInfo";
import countryService from "./services/countryService";
import { Country } from "./types";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [inputStr, setInputStr] = useState<string>("");

  useEffect(() => {
    countryService.getCountries().then(setCountries);
  }, []);

  const currCountries = countries.filter(
    (country) =>
      !!inputStr &&
      country.name.common.toLowerCase().includes(inputStr.toLowerCase())
  );

  return (
    <>
      <div>
        <span style={{ marginRight: "8px" }}>find countries</span>
        <input
          onChange={(e) => setInputStr(e.target.value)}
          type="text"
          value={inputStr}
        />
      </div>

      {currCountries.length > 10 && (
        <div style={{ marginTop: "4px" }}>
          Too many matches, specify another filter
        </div>
      )}

      {currCountries.length <= 10 && currCountries.length > 1 && (
        <div style={{ marginTop: "4px" }}>
          {currCountries.map((country) => (
            <div key={country.name.official}>
              {country.name.common}
              <button
                onClick={() => setInputStr(country.name.common)}
                style={{ marginLeft: "8px" }}
              >
                show
              </button>
            </div>
          ))}
        </div>
      )}

      {currCountries.length === 1 && <CountryInfo country={currCountries[0]} />}
    </>
  );
}

export default App;

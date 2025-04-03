import axios from "axios";

import { Country } from "../types";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries";

const getCountries = async (): Promise<Country[]> =>
  axios.get(`${BASE_URL}/api/all`).then((response) => response.data);

export default {
  getCountries,
};

import axios from "axios";

import { Person } from "../types";

const BASE_URL = "http://localhost:3001";

const getPersons = async (): Promise<Person[]> =>
  axios.get(`${BASE_URL}/persons`).then((response) => response.data);

const createPerson = async (person: Omit<Person, "id">): Promise<Person> =>
  axios.post(`${BASE_URL}/persons`, person).then((response) => response.data);

export default {
  createPerson,
  getPersons,
};

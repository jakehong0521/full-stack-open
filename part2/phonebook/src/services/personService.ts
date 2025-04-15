import axios from "axios";

import { Person } from "../types";

const getPersons = async (): Promise<Person[]> =>
  axios.get(`/api/persons`).then((response) => response.data);

const createPerson = async (person: Omit<Person, "id">): Promise<Person> =>
  axios.post(`/api/persons`, person).then((response) => response.data);

const deletePerson = async (id: string): Promise<void> =>
  axios.delete(`/api/persons/${id}`);

const updatePerson = async (person: Person): Promise<Person> =>
  axios
    .put(`/api/persons/${person.id}`, person)
    .then((response) => response.data);

export default {
  createPerson,
  deletePerson,
  getPersons,
  updatePerson,
};

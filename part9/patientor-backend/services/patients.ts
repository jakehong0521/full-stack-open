import { v1 as uuid } from "uuid";

import patientsData from "../data/patients";
import { NewPatient, Patient } from "../types/patients";

const getPatients = () => {
  return patientsData;
};

const createPatient = (newPatient: NewPatient): Patient => {
  const id = uuid();
  const patient: Patient = {
    ...newPatient,
    id,
  };
  patientsData.push(patient);
  return patient;
};

export default {
  createPatient,
  getPatients,
};

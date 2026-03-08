import { v1 as uuid } from "uuid";

import patientsData from "../data/patients";
import { NewPatient, Patient } from "../types/patients";
import { toPatient } from "../utils/patients";

const getPatients = (): Patient[] => {
  return patientsData.map(toPatient);
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

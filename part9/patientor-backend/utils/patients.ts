import * as z from "zod";

import {
  Gender,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types/patients";

export const PatientSchema = z.object({
  dateOfBirth: z.string(),
  gender: z.enum(Gender),
  id: z.string(),
  name: z.string().min(1),
  occupation: z.string().min(2),
  ssn: z.string().min(1),
});

export const NewPatientSchema = PatientSchema.omit({ id: true });

export const NonSensitivePatientSchema = PatientSchema.omit({ ssn: true });

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export const toNonSensitivePatient = (
  patient: Patient,
): NonSensitivePatient => {
  return NonSensitivePatientSchema.parse(patient);
};

export const toPatient = (object: unknown): Patient => {
  return PatientSchema.parse(object);
};

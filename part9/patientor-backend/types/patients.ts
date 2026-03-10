import * as z from "zod";
import {
  NewPatientSchema,
  NonSensitivePatientSchema,
  PatientSchema,
} from "../utils/patients";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatient = z.infer<typeof NewPatientSchema>;
export type NonSensitivePatient = z.infer<typeof NonSensitivePatientSchema>;
export type Patient = z.infer<typeof PatientSchema>;

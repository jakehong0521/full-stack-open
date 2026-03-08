export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Patient = {
  dateOfBirth: string;
  gender: Gender;
  id: string;
  name: string;
  occupation: string;
  ssn: string;
};

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

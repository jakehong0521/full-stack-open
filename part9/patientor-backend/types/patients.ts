export type Patient = {
  dateOfBirth: string;
  gender: string;
  id: string;
  name: string;
  occupation: string;
  ssn: string;
};

export type NonSensitivePatient = Omit<Patient, "ssn">;

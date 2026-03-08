import { Gender, NewPatient, Patient } from "../types/patients";

export const toPatient = (object: unknown): Patient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "id" in object &&
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const patient: Patient = {
      id: parseId(object.id),
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
    };
    return patient;
  }
  throw new Error("Incorrect or missing data");
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseName(object.occupation),
    };
    return newPatient;
  } else {
    throw new Error("Incorrect or missing data");
  }
};

const isString = (text: unknown): text is string => {
  return !!text && typeof text === "string";
};

const isDateOfBirth = (dateOfBirth: unknown): dateOfBirth is string => {
  return isString(dateOfBirth);
};

const isGender = (gender: unknown): gender is Gender => {
  return (
    !!gender &&
    typeof gender === "string" &&
    Object.values(Gender).includes(gender as Gender)
  );
};

const isId = (id: unknown): id is string => {
  return isString(id);
};

const isName = (name: unknown): name is string => {
  return isString(name);
};

const isOccupation = (occupation: unknown): occupation is string => {
  return isString(occupation);
};

const isSsn = (ssn: unknown): ssn is string => {
  return isString(ssn);
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isDateOfBirth(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseId = (id: unknown): string => {
  if (!isId(id)) {
    throw new Error("Incorrect or missing id");
  }
  return id;
};

const parseName = (name: unknown): string => {
  if (!isName(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isOccupation(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isSsn(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

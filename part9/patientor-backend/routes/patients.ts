import express, { Response } from "express";

import patientsService from "../services/patients";
import { NonSensitivePatient } from "../types/patients";
import { toNewPatient } from "../utils/patients";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(
    patientsService.getPatients().map((patient) => ({
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      id: patient.id,
      name: patient.name,
      occupation: patient.occupation,
    })),
  );
});

router.post("/", (req, res) => {
  const createdPatient = patientsService.createPatient(toNewPatient(req.body));
  res.json(createdPatient);
});

export default router;

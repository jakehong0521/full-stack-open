import express, { Response } from "express";

import patientsService from "../services/patients";
import { NonSensitivePatient } from "../types/patients";

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

export default router;

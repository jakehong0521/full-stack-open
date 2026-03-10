import express, { Response } from "express";

import patientsService from "../services/patients";
import { NonSensitivePatient } from "../types/patients";
import { errorMiddleware, newPatientParser } from "../utils/middleware";
import { toNewPatient, toNonSensitivePatient } from "../utils/patients";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getPatients().map(toNonSensitivePatient));
});

router.post("/", newPatientParser, (req, res) => {
  const createdPatient = patientsService.createPatient(toNewPatient(req.body));
  res.json(createdPatient);
});

router.use(errorMiddleware);

export default router;

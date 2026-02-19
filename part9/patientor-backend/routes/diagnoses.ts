import express, { Response } from "express";

import diagnosesService from "../services/diagnoses";
import { Diagnosis } from "../types/diagnoses";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;

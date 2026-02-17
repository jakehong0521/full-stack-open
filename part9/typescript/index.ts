import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { getIsNumber } from "./utils";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height: heightStr, weight: weightStr } = req.query;
  const height = Number(heightStr);
  const weight = Number(weightStr);

  const isInputInvalid =
    !height || !weight || !getIsNumber(height) || !getIsNumber(weight);

  console.log({ isInputInvalid });

  if (isInputInvalid) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json({
    bmi: calculateBmi(height, weight),
    height,
    weight,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

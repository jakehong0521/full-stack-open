import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { getIsNumber } from "./utils";

const app = express();
app.use(express.json());

app.get("/bmi", (req, res) => {
  const { height: heightStr, weight: weightStr } = req.query;
  const height = Number(heightStr);
  const weight = Number(weightStr);

  const isInputInvalid =
    !height || !weight || !getIsNumber(height) || !getIsNumber(weight);

  if (isInputInvalid) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json({
    bmi: calculateBmi(height, weight),
    height,
    weight,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((hour) => typeof hour === "number") ||
    typeof target !== "number"
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);

  res.json(result);
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

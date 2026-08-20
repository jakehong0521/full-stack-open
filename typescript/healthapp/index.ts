import express from "express";

import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
import { isNotNumber } from "./utils.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (isNotNumber(Number(height)) || isNotNumber(Number(weight))) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight: Number(weight),
      height: Number(height),
      bmi,
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  } else if (
    isNotNumber(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(isNotNumber)
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const result = calculateExercises(
      daily_exercises as number[],
      target as number,
    );
    res.json(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

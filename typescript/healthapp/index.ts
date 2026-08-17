import express from "express";

import { calculateBmi } from "./bmiCalculator.ts";
import { isNotNumber } from "./utils.ts";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import cors from "cors";
import express from "express";

import diagnosisRouter from "./routes/diagnoses";

const app = express();
app.use(express.json(), cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

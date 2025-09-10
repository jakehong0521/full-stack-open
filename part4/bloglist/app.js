const express = require("express");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connection to MongoDB:", error.message);
  });

const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;

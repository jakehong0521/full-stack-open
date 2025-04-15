require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const { generateUuid } = require("./utils");
const { Person } = require("./mongo");

const app = express();
app.use(express.json());
app.use(express.static("dist"));

morgan.token("reqBody", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status - :response-time ms :reqBody"));

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.post("/api/persons", (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "name is missing" });
  }

  if (!req.body.number) {
    return res.status(400).json({ error: "number is missing" });
  }

  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });
  newPerson
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then(() => {
      return res.status(204).end();
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "missing id" });
  }

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }
      return res.json(person);
    })
    .catch((err) => {
      next(err);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    throw new Error("missing id");
  }

  if (!req.body.number) {
    throw new Error("missing number");
  }

  const inputPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  const validationErr = inputPerson.validateSync({
    name: req.body.name,
    number: req.body.number,
  });
  if (validationErr) {
    return res.status(400).send({ error: validationErr.message });
  }

  Person.findByIdAndUpdate(id, { number: req.body.number }, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date();
      return res.send(
        `<p>Phonebook has info for ${count} ${
          count > 1 ? "people" : "person"
        }</p><p>${date}</p>`
      );
    })
    .catch((err) => {
      next(err);
    });
});

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  return res.status(400).send({ error: error.message });
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);

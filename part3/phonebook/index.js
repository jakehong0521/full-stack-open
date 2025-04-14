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

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    return res.json(person);
  } else {
    return res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
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
  newPerson.save().then((savedPerson) => {
    return res.json(savedPerson);
  });
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

app.get("/info", (req, res) => {
  const date = new Date();
  const personCount = persons.length;
  return res.send(
    `<p>Phonebook has info for ${personCount} people</p><p>${date}</p>`
  );
});

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  res.status(400).send({ error: "something went wrong" });
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);

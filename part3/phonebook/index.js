const { generateUuid } = require("./utils");
const express = require("express");
const morgan = require("morgan");

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
  return res.json(persons);
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

  const existingPerson = persons.find((p) => p.name === req.body.name);
  if (existingPerson) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const existingNumber = persons.find((p) => p.number === req.body.number);
  if (existingNumber) {
    return res.status(400).json({ error: "number must be unique" });
  }

  const newPerson = {
    id: generateUuid(),
    name: req.body.name,
    number: req.body.number,
  };
  persons = persons.concat(newPerson);

  return res.status(201).json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  if (!person) {
    return res.status(404).end();
  }

  persons = persons.filter((p) => p.id !== id);
  return res.status(204).end();
});

app.get("/info", (req, res) => {
  const date = new Date();
  const personCount = persons.length;
  return res.send(
    `<p>Phonebook has info for ${personCount} people</p><p>${date}</p>`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

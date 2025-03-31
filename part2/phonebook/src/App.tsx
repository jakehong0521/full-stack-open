import { FormEvent, useState } from "react";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [filteredSubstr, setFilteredSubstr] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<string>("");
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const handleFilteredSubstrChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilteredSubstr(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilteredSubstrChange} value={filteredSubstr} />

      <h2>add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filteredSubstr.toLowerCase())
        )}
      />
    </div>
  );
};

export default App;

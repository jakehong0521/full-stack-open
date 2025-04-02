import { FormEvent, useEffect, useState } from "react";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./services/personService";
import { Person } from "./types";

const App = () => {
  const [filteredSubstr, setFilteredSubstr] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<string>("");
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    personService.getPersons().then(setPersons);
  }, []);

  const handleDeletePerson = (person: Person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons((prevPersons) =>
          prevPersons.filter((currPerson) => currPerson.id !== person.id)
        );
      });
    }
  };

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
    } else {
      personService
        .createPerson({
          name: newName,
          number: newNumber,
        })
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          alert(
            `An error occurred while attempting to add a new person: ${error}`
          );
        });
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
        deletePerson={handleDeletePerson}
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filteredSubstr.toLowerCase())
        )}
      />
    </div>
  );
};

export default App;

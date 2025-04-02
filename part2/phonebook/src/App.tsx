import { FormEvent, useEffect, useState } from "react";

import ErrorMessage from "./ErrorMessage";
import Filter from "./Filter";
import NoticeMessage from "./NoticeMessage";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./services/personService";
import { Person } from "./types";

const App = () => {
  const [filteredSubstr, setFilteredSubstr] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<string>("");
  const [persons, setPersons] = useState<Person[]>([]);
  const [noticeMessage, setNoticeMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    personService.getPersons().then(setPersons);
  }, []);

  const handleDeletePerson = (person: Person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((currPerson) => currPerson.id !== person.id)
          );
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setTimeout(() => setErrorMessage(""), 2000);
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

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      personService
        .updatePerson({ ...existingPerson, number: newNumber })
        .then((updatedPerson) => {
          setPersons((prevPersons) =>
            prevPersons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          setNoticeMessage(`Updated the phone number of ${updatedPerson.name}`);
          setTimeout(() => setNoticeMessage(""), 2000);
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${existingPerson.name} has already been removed from server`
          );
          setTimeout(() => setErrorMessage(""), 2000);
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== existingPerson.id)
          );
        });
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
          setNoticeMessage(`Added ${createdPerson.name}`);
          setTimeout(() => setNoticeMessage(""), 2000);
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

      <NoticeMessage message={noticeMessage} />
      <ErrorMessage message={errorMessage} />

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

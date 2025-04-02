import { Person } from "./types";

type PersonsProps = {
  deletePerson: (person: Person) => void;
  persons: Person[];
};

const Persons = ({ deletePerson, persons }: PersonsProps) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;

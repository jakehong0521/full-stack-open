import { Person } from "./types";

type PersonsProps = {
  persons: Person[];
};

const Persons = ({ persons }: PersonsProps) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default Persons;

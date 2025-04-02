type PersonsProps = {
  persons: {
    id: string;
    name: string;
    number: string;
  }[];
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

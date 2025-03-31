type PersonFormProps = {
  newName: string;
  newNumber: string;
  onSubmit: (formEvent: React.FormEvent<HTMLFormElement>) => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PersonForm = ({
  newName,
  newNumber,
  onSubmit,
  onNameChange,
  onNumberChange,
}: PersonFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onNameChange} type="text" value={newName} />
      </div>
      <div>
        number: <input onChange={onNumberChange} type="tel" value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;

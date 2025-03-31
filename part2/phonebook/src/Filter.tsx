type FilterProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Filter = ({ onChange, value }: FilterProps) => {
  return (
    <div>
      filter shown with <input onChange={onChange} type="text" value={value} />
    </div>
  );
};

export default Filter;

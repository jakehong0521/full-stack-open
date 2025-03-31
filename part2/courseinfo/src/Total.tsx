type TotalProps = {
  contents: {
    name: string;
    exercises: number;
  }[];
};

const Total = ({ contents }: TotalProps) => {
  const total = contents.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

export default Total;

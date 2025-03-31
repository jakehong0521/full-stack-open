type TotalProps = {
  contents: {
    name: string;
    exercises: number;
  }[];
};

const Total = ({ contents }: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {contents.reduce((acc, cur) => acc + cur.exercises, 0)}
    </p>
  );
};

export default Total;

type TotalProps = {
  contents: {
    name: string;
    exercises: number;
  }[];
};

const Total = ({ contents }: TotalProps) => {
  return (
    <p>
      <strong>
        total of {contents.reduce((acc, cur) => acc + cur.exercises, 0)}{" "}
        exercises
      </strong>
    </p>
  );
};

export default Total;

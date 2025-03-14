type PartProps = {
  name: string;
  numExercise: number;
};

const Part = ({ name, numExercise }: PartProps) => {
  return (
    <p>
      {name} {numExercise}
    </p>
  );
};

export default Part;

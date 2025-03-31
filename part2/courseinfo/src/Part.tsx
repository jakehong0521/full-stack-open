type PartProps = {
  name: string;
  exercises: number;
};

const Part = ({ name, exercises }: PartProps) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Part;

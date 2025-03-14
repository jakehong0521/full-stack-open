import Part from "./Part";

type ContentProps = {
  contents: {
    name: string;
    numExercise: number;
  }[];
};

const Content = ({ contents }: ContentProps) => {
  return (
    <div>
      <Part name={contents[0].name} numExercise={contents[0].numExercise} />
      <Part name={contents[1].name} numExercise={contents[1].numExercise} />
      <Part name={contents[2].name} numExercise={contents[2].numExercise} />
    </div>
  );
};

export default Content;

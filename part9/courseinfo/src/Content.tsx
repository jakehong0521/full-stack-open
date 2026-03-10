import Part from "./Part";

type ContentProps = {
  contents: {
    name: string;
    exerciseCount: number;
  }[];
};

const Content = ({ contents }: ContentProps) => {
  return (
    <div>
      {contents.map((part) => (
        <Part
          key={part.name}
          name={part.name}
          exerciseCount={part.exerciseCount}
        />
      ))}
    </div>
  );
};

export default Content;

import Part from "./Part";

type ContentProps = {
  contents: {
    exercises: number;
    id: number;
    name: string;
  }[];
};

const Content = ({ contents }: ContentProps) => {
  return (
    <div>
      {contents.map((content) => (
        <Part
          exercises={content.exercises}
          key={content.id}
          name={content.name}
        />
      ))}
    </div>
  );
};

export default Content;

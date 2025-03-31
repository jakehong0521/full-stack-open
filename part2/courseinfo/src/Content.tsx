import Part from "./Part";

type ContentProps = {
  contents: {
    name: string;
    exercises: number;
  }[];
};

const Content = ({ contents }: ContentProps) => {
  return (
    <div>
      <Part name={contents[0].name} exercises={contents[0].exercises} />
      <Part name={contents[1].name} exercises={contents[1].exercises} />
      <Part name={contents[2].name} exercises={contents[2].exercises} />
    </div>
  );
};

export default Content;

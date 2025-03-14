type ContentProps = {
  contents: {
    name: string;
    numExercise: number;
  }[];
};

const Content = ({ contents }: ContentProps) => {
  return (
    <>
      {contents.map((content) => (
        <p key={content.name}>
          {content.name} {content.numExercise}
        </p>
      ))}
    </>
  );
};

export default Content;

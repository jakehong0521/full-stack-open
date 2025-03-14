import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        contents={[
          {
            name: part1,
            numExercise: exercises1,
          },
          {
            name: part2,
            numExercise: exercises2,
          },
          {
            name: part3,
            numExercise: exercises3,
          },
        ]}
      />
      <Total numExerciseArr={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;

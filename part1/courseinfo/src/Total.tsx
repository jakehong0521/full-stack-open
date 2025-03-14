type TotalProps = {
  numExerciseArr: number[];
};

const Total = ({ numExerciseArr }: TotalProps) => {
  return (
    <p>
      Number of exercises {numExerciseArr.reduce((acc, cur) => acc + cur, 0)}
    </p>
  );
};

export default Total;

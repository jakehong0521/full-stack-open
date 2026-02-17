interface ExerciseAnalysis {
  average: number;
  periodLength: number;
  rating: number;
  ratingDescription: string;
  success: boolean;
  target: number;
  trainingDays: number;
}

const calculateExercises = (
  hours: number[],
  targetHour: number,
): ExerciseAnalysis => {
  const rating = Math.ceil(
    (hours.filter((hour) => hour >= targetHour).length / hours.length) * 3,
  );
  return {
    average: hours.reduce((h1, h2) => h1 + h2, 0) / hours.length,
    periodLength: hours.length,
    rating,
    ratingDescription: getRatingDescription(rating),
    success: hours.every((hour) => hour >= targetHour),
    target: targetHour,
    trainingDays: hours.filter((hour) => hour > 0).length,
  };
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return "bad";
    case 2:
      return "not too bad but could be better";
    case 3:
      return `great`;
    default:
      throw new Error(`Invalid rating: ${rating}`);
  }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

import { getIsNumber } from "./utils";

interface ExerciseInput {
  hours: number[];
  target: number;
}

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

const parseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const inputs = args.slice(2).map(Number);

  if (inputs.every(getIsNumber)) {
    return {
      hours: inputs.slice(1),
      target: inputs[0],
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { hours, target } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

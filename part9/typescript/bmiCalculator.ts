import { getIsNumber } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 18.5) {
    return "Underweight range";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight range";
  } else {
    return "Obese range";
  }
};

interface BmiInput {
  weight: number;
  height: number;
}

const parseArguments = (args: string[]): BmiInput => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (getIsNumber(Number(args[2])) && getIsNumber(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { weight, height } = parseArguments(process.argv);
  console.log(calculateBmi(weight, height));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

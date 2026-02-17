export const getIsNumber = (value: any): value is number => {
  return typeof value === "number" && !isNaN(value);
};

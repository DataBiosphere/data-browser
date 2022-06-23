export const concatStrings = (values: string[] | string) => {
  if (typeof values === "string") {
    return values;
  }

  return values.reduce(
    (acc, value) => (acc ? `${acc}, ${value}` : `${value}`),
    ""
  );
};

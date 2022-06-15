export const concatStrings = (values: string[]) => {
  return values.reduce(
    (acc, value) => (acc ? `${acc}, ${value}` : `${value}`),
    ""
  );
};

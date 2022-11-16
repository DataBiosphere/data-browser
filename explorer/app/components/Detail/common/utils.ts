/**
 * String-concatenates the specified list of values to a string value, joined by a comma ",".
 * @param values - List of values.
 * @returns the values in a string, each value joined by a comma.
 */
export function stringifyValues(values: string[]): string {
  return values.join(", ");
}

/**
 * Adds a given object to an array of objects and returns a list of objects with distinct values in a given key.
 * @param objects - List of objects.
 * @param newObject - Object to add to the list of objects.
 * @param key - Key to check for distinct values.
 * @returns List of distinct objects.
 */
export function accumulateObject<ObjType extends object>(
  objects: ObjType[] = [],
  newObject: ObjType,
  key: keyof ObjType
): ObjType[] {
  if (objects?.find((obj) => obj[key] === newObject[key])) {
    return objects;
  }
  objects.push(newObject);
  return objects;
}

/**
 * Adds a given value to an array of values and returns a list of distinct values.
 * @param values - List of values.
 * @param value - Value to add to the list of values.
 * @returns List of distinct values.
 */
export function accumulateValue(
  values = [] as string[],
  value: string
): string[] {
  values.push(value);
  const setOfAccumulatedValues = new Set(values);
  return [...setOfAccumulatedValues];
}

/**
 * Merges two arrays of values and returns a list of distinct values.
 * @param values01 - Distinct list of values.
 * @param values02 - Additional list of values to be concatenated.
 * @returns List of distinct values.
 */
export function accumulateValues(
  values01 = [] as string[],
  values02: string[]
): string[] {
  const concatenatedValues = values01.concat(values02);
  const setOfAccumulatedValues = new Set(concatenatedValues);
  return [...setOfAccumulatedValues];
}

/**
 * Sums values together.
 * @param values - Array of values.
 * @returns summed value.
 */
export function sumValues(values: number[]): number {
  return values.reduce((acc, value = 0) => {
    return acc + value;
  }, 0);
}

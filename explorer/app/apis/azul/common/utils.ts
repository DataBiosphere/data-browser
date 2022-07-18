/**
 * Type that is a union of all keys of T that have a type of string or null array.
 */
type KeyOfTypeStringOrNullArray<T> = {
  [K in keyof T]: T[K] extends StringOrNullArray ? K : never;
}[keyof T];

/**
 * Type of possible values returned in an aggregated value from Azul.
 */
type StringOrNullArray = (string | null)[];

/**
 * Aggregate and process the values of the given key across the given response values.
 * @param responseValues - Array of values returned from the backend.
 * @param key - The object key (of an array value containing string or null values) in each response value to aggregate.
 * @returns All non-null values in the response values with the given key.
 */
export function processAggregatedValue<
  T,
  K extends KeyOfTypeStringOrNullArray<T>
>(responseValues: T[], key: K): string[] {
  // Aggregate key values across response values.
  const values = aggregateResponseValues(responseValues, key);

  // Remove null values and convert empty arrays to ["Unspecified"] if necessary.
  return processNullElements(values);
}

/**
 * Aggregate the values of the given key across the given response values.
 * @param responseValues - Array of values returned from the backend.
 * @param key - The object key (of an array value) in each response value to aggregate.
 * @returns All values in the response values with the given key.
 */
function aggregateResponseValues<T, K extends KeyOfTypeStringOrNullArray<T>>(
  responseValues: T[],
  key: K
): StringOrNullArray {
  return responseValues
    .map((responseValue) => responseValue[key])
    .flat() as unknown as StringOrNullArray; // TODO revisit type assertion here
}

/**
 * Remove null elements from the given array.
 * @param values - List of values.
 * @returns an array with no null elements.
 */
function filterDefinedValues(values?: StringOrNullArray): string[] | undefined {
  return values?.filter((value): value is string => !!value);
}

/**
 * Remove null elements, if any, from the given array.
 * @param values - Array to remove null elements from.
 * @returns Array with null elements removed.
 */
function processNullElements(values: StringOrNullArray): string[] {
  // Remove any nulls from given array
  const filteredValues = filterDefinedValues(values); // Handle possible [null] values

  // Handle undefined or empty lists: caller is expecting "Unspecified", not an empty array.
  if (!filteredValues || filteredValues?.length === 0) {
    return ["Unspecified"]; // TODO constant for Unspecified
  }

  return filteredValues;
}

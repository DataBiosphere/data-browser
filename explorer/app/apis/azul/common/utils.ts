/**
 * Type that is a union of all keys of T that have a type of string or null.
 */
import { LABEL } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";

/**
 * Type that is a union of all keys of T that have a type of string or null.
 */
type KeyOfTypeStringOrNull<T> = {
  [K in keyof T]: T[K] extends StringOrNull ? K : never;
}[keyof T];

/**
 * Type that is a union of all keys of T that have a type of number or null.
 */
type KeyOfTypeNumberOrNull<T> = {
  [K in keyof T]: T[K] extends NumberOrNull ? K : never;
}[keyof T];

/**
 * Type that is a union of all keys of T that have a type of string or null array.
 */
type KeyOfTypeStringOrNullArray<T> = {
  [K in keyof T]: T[K] extends StringOrNullArray ? K : never;
}[keyof T];

/**
 * Type of possible number values returned in a core value from Azul.
 */
type NumberOrNull = number | null;

/**
 * Type of possible string values returned in a core value from Azul.
 */
type StringOrNull = string | null;

/**
 * Type of possible values returned in an aggregated value from Azul.
 */
type StringOrNullArray = (string | null)[] | undefined;

/**
 * Returns true if the value null/undefined.
 * @param value - Any value.
 * @returns true if the value is null or undefined.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we can't determine the value.
export function isNullOrUndefined(value: any): boolean {
  return !(value || value === 0 || value === false);
}

/**
 * Aggregate and process the values of the given key across the given response values. The value with the given key
 * can either be an array value on a "core" entity or an aggregated "inner" entity.
 * @param responseValues - Array of values returned from the backend.
 * @param key - The object key (of an array value containing string or null values) in each response value to aggregate.
 * @returns All non-null values in the response values with the given key.
 */
export function processAggregatedOrArrayValue<
  T,
  K extends KeyOfTypeStringOrNullArray<T>
>(responseValues: T[], key: K): string[] {
  // Aggregate key values across response values.
  const values = aggregateResponseValues(responseValues, key);

  // Remove null values and convert empty arrays to ["Unspecified"] if necessary.
  return processNullElements(values);
}

/**
 * Aggregate and process the numerical values of the given key across the given response values.
 * @param responseValues - Array of values returned from the backend.
 * @param key - The object key (of a value containing number or null values) in each response value to aggregate.
 * @returns A totaled numerical value in the response values with the given key.
 */
export function processAggregatedNumberEntityValue<
  T,
  K extends KeyOfTypeNumberOrNull<T>
>(responseValues: T[], key: K): number {
  // Aggregate key values across response values.
  return aggregateNumericalResponseValues(responseValues, key);
}

/**
 * Process the string or null array value for the given response value.
 * @param responseValues - Singleton array containing values returned from the backend.
 * @param key - The object key (of an array value containing string or null values).
 * @param label - Value to display if value for given key is null. Defaults to "Unspecified".
 * @returns Value in the response with the given key, converted to array if null.
 */
export function processEntityArrayValue<
  T,
  K extends KeyOfTypeStringOrNullArray<T>
>(responseValues: T[], key: K, label = LABEL.UNSPECIFIED): string[] {
  // Response values should be a singleton array; check for at least one value here.
  if (responseValues.length === 0) {
    return [LABEL.ERROR];
  }

  // Grab value from the singleton array for the given key.
  const responseValue = responseValues[0];
  const values = responseValue[key] as unknown as StringOrNullArray; // TODO revisit type assertion here

  // Sanitize.
  return processNullElements(values) ?? [label];
}

/**
 * Process the string or null value for the given response value.
 * @param responseValues - Singleton array containing values returned from the backend.
 * @param key - The object key (of a value containing string or null values).
 * @param label - Value to display if value for given key is null. Defaults to "Unspecified".
 * @returns Value in the response with the given key, converted to string if null.
 */
export function processEntityValue<T, K extends KeyOfTypeStringOrNull<T>>(
  responseValues: T[],
  key: K,
  label = LABEL.UNSPECIFIED
): string {
  // Response values should be a singleton array; check for at least one value here.
  if (responseValues.length === 0) {
    return LABEL.ERROR;
  }

  // Grab value from the singleton array for the given key.
  const responseValue = responseValues[0];
  const value = responseValue[key] as unknown as StringOrNull; // TODO revisit type assertion here

  // Sanitize.
  return value ?? label;
}

/**
 * Process the number or null value for the given response value.
 * @param responseValues - Singleton array containing values returned from the backend.
 * @param key - The object key (of a value containing number or null values).
 * @param defaultValue - Value to display if value for given key is null. Defaults to 0.
 * @returns Value in the response with the given key, converted to 0 if null.
 */
export function processNumberEntityValue<T, K extends KeyOfTypeNumberOrNull<T>>(
  responseValues: T[],
  key: K,
  defaultValue = 0
): number {
  // Response values should be a singleton array; check for at least one value here.
  if (responseValues.length === 0) {
    return 0;
  }

  // Grab value from the singleton array for the given key.
  const responseValue = responseValues[0];
  const value = responseValue[key] as unknown as NumberOrNull; // TODO revisit type assertion here

  // Sanitize.
  return value ?? defaultValue;
}

/**
 * Aggregate the numerical values of the given key across the given response values.
 * @param responseValues - Array of values returned from the backend.
 * @param key - The object key in each response value to aggregate.
 * @returns Totaled value in the response values with the given key.
 */
function aggregateNumericalResponseValues<
  T,
  K extends KeyOfTypeNumberOrNull<T>
>(responseValues: T[], key: K): number {
  return responseValues
    .map((responseValue) => responseValue[key] as unknown as number)
    .reduce((acc, val) => acc + (val || 0), 0);
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
    .filter((responseValue) => !!responseValue[key])
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
    return [LABEL.UNSPECIFIED];
  }

  return filteredValues;
}

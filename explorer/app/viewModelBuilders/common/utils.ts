/**
 * Sanitize a string for a view model builder.
 *
 * @param input - the value to sanitize
 * @returns Change empty string, null  or undefined values to "Unspecified"
 */
export function sanitizeString(input: string): string {
  if (input === "" || input === null || input === undefined) {
    return "Unspecified";
  } else {
    return input;
  }
}

/**
 * Sanatize a string array for display.
 *
 * @param input - the string array to sanitize.
 * @returns a blank array if the input is undefined or otherwize an array of sanitized strings.
 */
export function sanitizeStringArray(input: string[]): string[] {
  if (!input) {
    return [];
  }
  return input.map(sanitizeString);
}

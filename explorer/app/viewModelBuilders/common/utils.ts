/**
 * Sanitizes a string for display i.e. any empty, null or undefined value is sanitized to "Unspecified".
 * @param str - String to sanitize.
 * @returns the string or sanitized string value.
 */
export function sanitizeString(str: string): string {
  if (str === "" || str === null || str === undefined) {
    return "Unspecified";
  } else {
    return str;
  }
}

/**
 * Sanitizes a string array for display i.e. any string element within the string array that is an empty, null or
 * undefined value is sanitized to "Unspecified".
 * @param strArray - String array to sanitize.
 * @returns the string array, sanitized.
 */
export function sanitizeStringArray(strArray: string[]): string[] {
  if (!strArray || strArray.length === 0) {
    return ["Unspecified"];
  }
  return strArray.map(sanitizeString);
}

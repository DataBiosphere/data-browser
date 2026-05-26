/**
 * Escapes regex special characters in a string.
 * @param s - The string to escape.
 * @returns A string with all RegExp special characters escaped.
 */
export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

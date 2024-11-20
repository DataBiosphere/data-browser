/**
 * Returns "accessible" select category label for the given select category value.
 * @param value - Value.
 * @returns select category label.
 */
export function mapAccessibleValue(value: string): string {
  if (value === "false") {
    return "Required";
  }
  return "Granted";
}

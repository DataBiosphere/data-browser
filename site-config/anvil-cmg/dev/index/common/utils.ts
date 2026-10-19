import { DIAGNOSIS_DISPLAY_VALUE } from "./diagnosis";

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

/**
 * Returns "diagnosis" select category label for the given select category value.
 * A value can hold several term IDs separated by semicolons; each ID with a
 * known name is shown as "Name (ID)", and the parts are joined with "; ".
 * @param value - Value.
 * @returns select category label.
 */
export function mapDiagnosisValue(value: string): string {
  let isMapped = false;
  const labels = value
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      // Only the lookup's own keys; not built-in keys such as "constructor".
      if (!Object.hasOwn(DIAGNOSIS_DISPLAY_VALUE, part)) return part;
      isMapped = true;
      return `${DIAGNOSIS_DISPLAY_VALUE[part]} (${part})`;
    });

  return isMapped ? labels.join("; ") : value;
}

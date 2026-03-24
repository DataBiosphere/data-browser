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
 * @param value - Value.
 * @returns select category label.
 */
export function mapDiagnosisValue(value: string): string {
  const mappedValue = DIAGNOSIS_DISPLAY_VALUE[value.trim()];

  if (mappedValue) {
    return `${mappedValue} (${value})`;
  }

  return value;
}

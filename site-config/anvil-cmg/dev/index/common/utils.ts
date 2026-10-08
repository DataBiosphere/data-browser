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
  const parts = value.split(";").map((part) => part.trim());

  if (!parts.some((part) => DIAGNOSIS_DISPLAY_VALUE[part])) {
    return value;
  }

  return parts
    .map((part) => {
      const mappedValue = DIAGNOSIS_DISPLAY_VALUE[part];
      return mappedValue ? `${mappedValue} (${part})` : part;
    })
    .join("; ");
}

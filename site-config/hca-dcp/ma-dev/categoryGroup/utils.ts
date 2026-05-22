import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";

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
 * Returns "Data Use Restrictions" select category label for the given select category value.
 * @param value - Value.
 * @returns select category label.
 */
export function mapDataUseRestrictionValue(value: string): string {
  if (value === LABEL.UNSPECIFIED) {
    return LABEL.EMPTY;
  }
  return value;
}

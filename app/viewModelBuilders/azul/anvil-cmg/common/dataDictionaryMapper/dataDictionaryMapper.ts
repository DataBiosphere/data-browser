import { rowHasKey } from "@databiosphere/findable-ui/lib/components/Table/columnDef/accessorFn/typeGuards";
import {
  Attribute,
  AttributeValueTypes,
} from "@databiosphere/findable-ui/lib/common/entities";

/**
 * Returns a required accessor function based on the original row.
 * @param originalRow - The original row.
 * @returns Required accessor function.
 */
export function requiredAccessorFn(
  originalRow: Attribute
): AttributeValueTypes {
  if (!rowHasKey(originalRow, "required")) return null;
  const isRequired = originalRow.required;
  return {
    color: isRequired ? "error" : undefined,
    label: isRequired ? "Yes" : "No",
    variant: "status",
  };
}

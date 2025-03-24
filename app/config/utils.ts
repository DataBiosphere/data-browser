import { SelectCategoryValue } from "@databiosphere/findable-ui/lib/common/entities";

/**
 * Returns select category value with formatted label.
 * @param formatLabel - Function to format label.
 * @returns select category value with formatted label.
 */
export function mapSelectCategoryValue(
  formatLabel: (label: string) => string
): (select: SelectCategoryValue) => SelectCategoryValue {
  return (selectCategoryValue: SelectCategoryValue) => {
    return {
      ...selectCategoryValue,
      label: formatLabel(selectCategoryValue.label),
    };
  };
}

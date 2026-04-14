import { SelectCategoryValue } from "@databiosphere/findable-ui/lib/common/entities";

/**
 * Returns true if the current environment is production.
 * Determined by checking if NEXT_PUBLIC_SITE_CONFIG ends with "-prod".
 * @returns true if production environment.
 */
export function isProductionEnvironment(): boolean {
  const config = process.env.NEXT_PUBLIC_SITE_CONFIG ?? "";
  return config.endsWith("-prod");
}

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

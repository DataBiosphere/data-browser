/**
 * Map of category key to category label.
 */
export type CategoryKeyLabel = Map<string, string>;

/**
 * Map category key to category label.
 * @param CATEGORY_KEY - Category key.
 * @param CATEGORY_LABEL - Category label.
 * @returns map of category key to category label.
 */
export function mapCategoryKeyLabel(
  CATEGORY_KEY: Record<string, string>,
  CATEGORY_LABEL: Record<string, string>
): CategoryKeyLabel {
  const categoryKeyLabel: CategoryKeyLabel = new Map();
  for (const [key, categoryKey] of Object.entries(CATEGORY_KEY)) {
    const categoryLabel = CATEGORY_LABEL[key as keyof typeof CATEGORY_LABEL];
    categoryKeyLabel.set(categoryKey, categoryLabel || categoryKey); // Use category key as label if label is not defined.
  }
  return categoryKeyLabel;
}

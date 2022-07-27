import {
  SelectCategory,
  SelectCategoryValueView,
  SelectCategoryView,
} from "../common/entities";
import { useConfig } from "./useConfig";
import { useEffect, useState } from "react";
import { CategoryConfig } from "../config/common/entities";
import { COLLATOR_CASE_INSENSITIVE } from "../common/constants";

/**
 * Shape of return value from this useCategoryFilter hook.
 */
export interface FilterInstance {
  categories: SelectCategoryView[];
}

/**
 * State backing filter functionality and calculations. Converted to view model for display.
 */
type FilterState = SelectCategory[];

/**
 * Server-side faceted filter functionality.
 * @param categories - Full set of categories.
 * @returns Object container filter accessor (view model of filter state).
 */
export const useCategoryFilter = (
  categories: SelectCategory[]
): FilterInstance => {
  // Complete set of categories and category values to be included for display and filtering.
  const [filterState, setFilterState] = useState<FilterState>([]);

  // Grab the site config.
  const { categoryConfigs = [] } = useConfig();

  // Build filter state from categories and category config.
  useEffect(() => {
    const acceptListCategories = categories
      .filter((category) => isCategoryAcceptListed(category, categoryConfigs))
      .map((category) => ({
        key: category.key,
        label: getCategoryLabel(category.key, categoryConfigs),
        values: category.values,
      }));
    if (acceptListCategories && acceptListCategories.length) {
      setFilterState(acceptListCategories);
    }
  }, [categories, categoryConfigs]);

  return {
    categories: buildCategoryViews(filterState),
  };
};

/**
 * Build view-specific models from filter state, to facilitate easy rendering.
 * @param filterState - Categories, category value and their counts with the current filter applied.
 * @returns Array of category view objects.
 */
function buildCategoryViews(filterState?: FilterState): SelectCategoryView[] {
  if (!filterState) {
    return [];
  }

  // Build view models for each category.
  const views = filterState.map((category) => {
    // Build view models for each category value in this category.
    const values = category.values.map((categoryValue) => {
      return {
        count: categoryValue.count,
        key: categoryValue.key,
        label: categoryValue.key,
        selected: false,
      };
    });
    values.sort(sortCategoryValueViews);

    return {
      isDisabled: false,
      key: category.key,
      label: category.label,
      values,
    };
  });

  views.sort(sortCategoryViews);
  return views;
}

/**
 * Get the label for the given category key as per the config.
 * @param key - Key of category to find label of.
 * @param categoryConfigs - Category accept list.
 * @returns the display value for the given category.
 */
function getCategoryLabel(
  key: string,
  categoryConfigs: CategoryConfig[]
): string {
  const categoryConfig = categoryConfigs.find(
    (categoryConfig) => categoryConfig.key === key
  );
  if (!categoryConfig) {
    return key;
  }
  return categoryConfig.label;
}

/**
 * Determine if category is to be included in filter.
 * @param category - Category to check if included in accept list.
 * @param categoryConfigs - Category accept list.
 * @returns true if category is to be included in filter.
 */
function isCategoryAcceptListed(
  category: SelectCategory,
  categoryConfigs: CategoryConfig[]
): boolean {
  return categoryConfigs.some(
    (categoryConfig) => categoryConfig.key === category.key
  );
}

/**
 * Sort category value views by key, ascending.
 * @param cvv0 - First category value view to compare.
 * @param cvv1 - Second category value view to compare.
 * @returns Number indicating sort precedence of cv0 vs cv1.
 */
function sortCategoryValueViews(
  cvv0: SelectCategoryValueView,
  cvv1: SelectCategoryValueView
): number {
  return COLLATOR_CASE_INSENSITIVE.compare(cvv0.label, cvv1.label);
}

/**
 * Sort category views by display label, ascending.
 * @param c0 - First category view to compare.
 * @param c1 - Second category view to compare.
 * @returns Number indicating sort precedence of c0 vs c1.
 */
function sortCategoryViews(
  c0: SelectCategoryView,
  c1: SelectCategoryView
): number {
  return COLLATOR_CASE_INSENSITIVE.compare(c0.label, c1.label);
}

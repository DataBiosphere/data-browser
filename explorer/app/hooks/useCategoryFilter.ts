import {
  CategoryKey,
  CategoryValueKey,
  SelectCategory,
  SelectCategoryValue,
  SelectCategoryValueView,
  SelectCategoryView,
} from "../common/entities";
import { useConfig } from "./useConfig";
import { useCallback, useState } from "react";
import { CategoryConfig } from "../config/common/entities";
import { COLLATOR_CASE_INSENSITIVE } from "../common/constants";
import { SetFilterFn } from "./useFetchEntities";
import { Filters, SelectedFilter } from "../apis/azul/common/entities";

/**
 * Shape of return value from this useCategoryFilter hook.
 */
export interface FilterInstance {
  categories: SelectCategoryView[];
  onFilter: OnFilterFn;
}

/**
 * Function invoked when selected state of a category value is toggled or range is selected.
 */
export type OnFilterFn = (
  categoryKey: CategoryKey,
  selectedCategoryValue: CategoryValueKey,
  selected: boolean
) => void;

/**
 * State backing filter functionality and calculations. Converted to view model for display.
 */
type FilterState = Filters;

/**
 * Server-side faceted filter functionality.
 * @param categories - Full set of categories.
 * @param setFilter - Function to call to trigger re-fetch of entities on change of selected filter values.
 * @returns Object container filter accessor (view model of filter state).
 */
export const useCategoryFilter = (
  categories: SelectCategory[],
  setFilter: SetFilterFn
): FilterInstance => {
  // Complete set of categories and category values to be included for display and filtering.
  const [filterState, setFilterState] = useState<FilterState>([]);

  // Grab the site config.
  const { categoryConfigs = [] } = useConfig();

  // Update set of selected filters on select of category value.
  const onFilter = useCallback<OnFilterFn>(
    (
      categoryKey: CategoryKey,
      selectedValue: CategoryValueKey,
      selected: boolean
    ) => {
      const nextFilterState = buildNextFilterState(
        filterState,
        categoryKey,
        selectedValue,
        selected
      );
      setFilterState(nextFilterState);
      setFilter(nextFilterState);
    },
    [filterState, setFilter]
  );

  return {
    categories: buildCategoryViews(categories, categoryConfigs, filterState),
    onFilter,
  };
};

/**
 * Build the view-specific model of the given category value.
 * @param categoryValue - The category value to build a view model of.
 * @param categorySelectedFilter - Current filter state for a category.
 * @returns Full built category value view, ready for display.
 */
function buildCategoryValueView(
  categoryValue: SelectCategoryValue,
  categorySelectedFilter?: SelectedFilter
): SelectCategoryValueView {
  // Determine if the category value is currently selected.
  const selected = isCategoryValueSelected(
    categoryValue.key,
    categorySelectedFilter
  );

  // Build view model.
  return {
    count: categoryValue.count,
    key: categoryValue.key,
    label: categoryValue.label,
    selected,
  };
}

/**
 * Build the view-specific model of the given category, including the category label pulled from the config.
 * @param category - The category to build a view model of.
 * @param categoryValueViews - Set of category value view models for the given category.
 * @param categoryConfigs - Category configs indicating accept list as well as label configuration.
 * @returns Full built category value view, ready for display.
 */
function buildCategoryView(
  category: SelectCategory,
  categoryValueViews: SelectCategoryValueView[],
  categoryConfigs: CategoryConfig[]
): SelectCategoryView {
  return {
    isDisabled: false,
    key: category.key,
    label: getCategoryLabel(category.key, categoryConfigs),
    values: categoryValueViews,
  };
}

/**
 * Build view-specific models from filter state, to facilitate easy rendering.
 * @param categories - Categories, category value and their counts with the current filter applied.
 * @param categoryConfigs - Category configs indicating accept list as well as label configuration.
 * @param filterState - Current set of selected category and category values.
 * @returns Array of category view objects.
 */
function buildCategoryViews(
  categories: SelectCategory[],
  categoryConfigs: CategoryConfig[],
  filterState: FilterState
): SelectCategoryView[] {
  if (!categories) {
    return [];
  }

  // Determine the set of categories to display.
  const acceptListCategories = categories.filter((category) =>
    isCategoryAcceptListed(category, categoryConfigs)
  );

  // Build view models for each category.
  const views = acceptListCategories.map((category) => {
    // Get the set of selected values for this category, if any.
    const categorySelectedFilter = getCategorySelectedFilter(
      category.key,
      filterState
    );

    // Build view models for each category value in this category and sort alpha.
    const categoryValueViews = category.values.map((categoryValue) =>
      buildCategoryValueView(categoryValue, categorySelectedFilter)
    );
    categoryValueViews.sort(sortCategoryValueViews);

    // Build category view model.
    return buildCategoryView(category, categoryValueViews, categoryConfigs);
  });

  // Sort and return category views.
  views.sort(sortCategoryViews);
  return views;
}

/**
 * Build new set of selected filters on de/select of filter.
 * @param filterState - Current set of selected category and category values.
 * @param categoryKey - Key of category that has been de/selected.
 * @param selectedValue - Key of category value that has been de/selected
 * @param selected - True if value is selected, false if de-selected.
 * @returns New filter state generated from the current set of selected values and the newly selected value.
 */
function buildNextFilterState(
  filterState: FilterState,
  categoryKey: CategoryKey,
  selectedValue: CategoryValueKey,
  selected: boolean
): FilterState {
  // Check if the selected category already has selected values.
  const categorySelectedFilter = getCategorySelectedFilter(
    categoryKey,
    filterState
  );

  // Create a copy of the current filter state. Remove the selected filter for the selected category, if any.
  const nextFilterState = filterState.filter(
    (selectedFilter: SelectedFilter) =>
      selectedFilter !== categorySelectedFilter
  );

  // Create new selected filter for this category. Copy values currently selected for this category, if any.
  const nextCategorySelectedFilter = {
    categoryKey,
    value: categorySelectedFilter ? [...categorySelectedFilter.value] : [],
  };

  // Handle case where category value is selected.
  if (selected) {
    nextCategorySelectedFilter.value.push(selectedValue);
  }
  // Otherwise, category value has been de-selected; remove the selected value from the selected set of values.
  else {
    nextCategorySelectedFilter.value = nextCategorySelectedFilter.value.filter(
      (value: CategoryValueKey) => value !== selectedValue
    );
  }

  // Add the new selected filter for this category to the set of selected filters, if there are selected values for it.
  if (nextCategorySelectedFilter.value.length) {
    nextFilterState.push(nextCategorySelectedFilter);
  }

  return nextFilterState;
}

/**
 * Get the selected values for the given category, if any.
 * @param categoryKey - Key of category to check if it has any selected category values.
 * @param filterState - Current set of selected category and category values.
 * @returns The selected filter (i.e. the set of selected values) for the given category.
 */
function getCategorySelectedFilter(
  categoryKey: CategoryKey,
  filterState: FilterState
): SelectedFilter | undefined {
  return filterState.find((filter) => filter.categoryKey === categoryKey);
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
 * Determine if given category value is selected.
 * @param categoryValueKey - The key of the category value to check if selected in the filter state.
 * @param categorySelectedFilter - Current filter state for a category.
 * @returns True if category value is in the set of currently selected values.
 */
function isCategoryValueSelected(
  categoryValueKey: CategoryValueKey,
  categorySelectedFilter?: SelectedFilter
): boolean {
  if (!categorySelectedFilter) {
    return false;
  }
  return categorySelectedFilter.value.includes(categoryValueKey);
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

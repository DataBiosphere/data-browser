import { ButtonProps } from "@mui/material";
import React from "react";
import { CategoryTag, SelectCategoryView } from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { Filter } from "../Filter/filter";
import { FilterLabel } from "../FilterLabel/filterLabel";
import { FilterMenu } from "../FilterMenu/filterMenu";
import { FilterTags } from "../FilterTags/filterTags";
import { Filters as FilterList } from "./filters.styles";

interface Props {
  categories: SelectCategoryView[];
  onFilter: OnFilterFn;
}

/**
 * Returns set of selected category tags with tag label (the selected metadata label) and corresponding Tag onRemove function.
 * @param categoryView - View model of category to display.
 * @param onFilter - Function to execute on select of category value or remove of selected category value.
 * @returns Array of selected category tags.
 */
function buildSelectCategoryTags(
  categoryView: SelectCategoryView,
  onFilter: OnFilterFn
): CategoryTag[] {
  const { key: categoryKey, values } = categoryView;
  return values
    .filter(({ selected }) => selected)
    .map(({ key: categoryValueKey, label, selected }) => {
      return {
        label: label,
        onRemove: () => onFilter(categoryKey, categoryValueKey, !selected),
        superseded: false,
      };
    });
}

/**
 * Build filter menu element for the given category type.
 * @param categoryView - View model of category to display.
 * @param onFilter - Function to execute on select of category value or remove of selected category value.
 * @returns Filter menu element displaying category values and their corresponding selected state.
 */
function renderFilterMenu(
  categoryView: SelectCategoryView,
  onFilter: OnFilterFn
): JSX.Element {
  const { key, values } = categoryView;
  return <FilterMenu categoryKey={key} onFilter={onFilter} values={values} />;
}

/**
 * Build selected filter tags element for the given category type.
 * @param categoryView - View model of category to display.
 * @param onFilter - Function to execute on select of category value or remove of selected category value.
 * @returns Filter tags element displaying selected category values.
 */
function renderFilterTags(
  categoryView: SelectCategoryView,
  onFilter: OnFilterFn
): JSX.Element {
  const tags = buildSelectCategoryTags(categoryView, onFilter);
  return <FilterTags tags={tags} />;
}

/**
 * Build the filter target for the given category type.
 * @param categoryView - View model of category to display.
 * @param props - Button props e.g. "onClick" used to set filter popover state to "open".
 * @returns Filter target element displaying filter label and count.
 */
function renderFilterTarget(
  categoryView: SelectCategoryView,
  props: ButtonProps
): JSX.Element {
  const { isDisabled = false, label } = categoryView;
  return <FilterLabel disabled={isDisabled} label={label} {...props} />;
}

export const Filters = ({ categories, onFilter }: Props): JSX.Element => {
  return (
    <FilterList>
      {categories.map((category) => (
        <Filter
          content={renderFilterMenu(category, onFilter)}
          key={category.key}
          tags={renderFilterTags(category, onFilter)}
          Target={(props): JSX.Element => renderFilterTarget(category, props)}
        />
      ))}
    </FilterList>
  );
};

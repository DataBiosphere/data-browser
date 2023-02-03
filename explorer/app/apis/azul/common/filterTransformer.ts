import {
  PaginationIndex,
  PaginationResponse,
} from "../../../common/context/exploreState";
import { SelectCategory, SelectCategoryValue } from "../../../common/entities";
import {
  AzulPaginationResponse,
  AzulSearchIndex,
  AzulTermFacets,
  AZUL_FILTER_OPERATOR,
  Filters,
  LABEL,
  SelectedFilter,
} from "./entities";

/**
 * Transform generic filter (selected categories and category values) into an Azul-specific filter query param.
 * @param filters - Set of selected filter values.
 * @returns Azul-specific filter query string param.
 */
export function transformFilters(filters: Filters): string {
  // Build up model of filter params from filters.
  const initialFilterParams: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we can't determine the filter value.
    [k: string]: { [key in AZUL_FILTER_OPERATOR]?: any };
  } = {};
  const filterParams = filters.reduce((accum, filter) => {
    const { categoryKey, value } = filter;

    // Only handling "is" operator for now.
    const operator = AZUL_FILTER_OPERATOR.IS;

    // Add the category to the filter if not already added.
    if (!accum[categoryKey]) {
      accum[categoryKey] = {
        [operator]: [],
      };
    }

    // Add each selected value to the filter.
    value.forEach((v) => accum[categoryKey][operator].push(v));

    return accum;
  }, initialFilterParams);

  // Return if there are currently no filters
  if (!Object.keys(filterParams).length) {
    JSON.stringify({}); // TODO Test!
  }

  // Convert filter to query string param
  return JSON.stringify(filterParams);
}

export function transformAzulPagination(
  azulPagination: AzulPaginationResponse | undefined
): PaginationResponse {
  if (!azulPagination) {
    return {
      nextIndex: null,
      pageSize: 0,
      pages: 0,
      previousIndex: null,
      rows: 0,
    };
  }
  return {
    nextIndex: extractIndex("search_after", azulPagination.next),
    pageSize: azulPagination.size,
    pages: azulPagination.pages,
    previousIndex: extractIndex("search_before", azulPagination.previous),
    rows: azulPagination.total,
  };
}

function extractIndex(
  type: AzulSearchIndex,
  urlString: string | undefined
): PaginationIndex | null {
  if (!urlString) {
    return null;
  }
  const url = new URL(urlString);
  const params = new URLSearchParams(url.search);
  return {
    type: type,
    value: params.get(type),
  };
}

/**
 * Generalize Azul term facets model into categories and category values.
 * @param termFacets - Model of term facets returned from Azul.
 * @param filterState - Filter state.
 * @returns Categories and category values built from Azul term facets.
 */
export function transformTermFacets(
  termFacets: AzulTermFacets,
  filterState: SelectedFilter[]
): SelectCategory[] {
  const categories: SelectCategory[] = [];

  // Build categories and category values from term facets.
  return Object.keys(termFacets).reduce((accum, key) => {
    const termFacet = termFacets[key];
    // Build a set of filter state category values for the category.
    const setOfFilterStateValues = new Set(
      filterState.find(({ categoryKey }) => categoryKey === key)?.value
    );

    // Build category values from terms of term facet.
    const categoryValues: SelectCategoryValue[] = termFacet.terms.map(
      (term) => {
        if (setOfFilterStateValues.has(term.term)) {
          // Delete the filter state category value; the term facet term equivalent will build the
          // select category value.
          setOfFilterStateValues.delete(term.term);
        }
        return {
          count: term.count,
          key: term.term,
          label: term.term ?? LABEL.UNSPECIFIED,
          selected: false, // Selected state updated in filter hook.
        };
      }
    );

    // Add remaining filter state category values to the category values. This allows us to maintain the selected
    // state of values that are selected but possibly filtered out from subsequent category selection.
    // Selected category values filtered out are assigned a zero count.
    for (const term of [...setOfFilterStateValues]) {
      categoryValues.push({
        count: 0,
        key: term,
        label: term ?? LABEL.UNSPECIFIED,
        selected: false, // Selected state updated in filter hook
      });
    }

    // Build category and add to set of categories.
    const category: SelectCategory = {
      key,
      label: "", // Label is applied in filter hook where it has access to the config.
      values: categoryValues,
    };
    accum.push(category);

    return accum;
  }, categories);
}

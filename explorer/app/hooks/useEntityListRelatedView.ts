import { useContext, useEffect } from "react";
import { SelectedFilterValue } from "../apis/azul/common/entities";
import {
  ExploreActionKind,
  ExploreStateContext,
  ListItems,
  RelatedListItems,
} from "../common/context/exploreState";
import { RelatedSearchResult } from "../config/common/entities";
import { getEntityConfig } from "../config/config";
import { useAsync } from "./useAsync";

/**
 * Returns related entity lists filtered by related search results.
 * @param listItems - Entity list items.
 * @param relatedSearchResult - Related search result.
 * @param excludedValues - Selected category values to be excluded from related entity lists.
 * @returns related entities.
 */
export function buildRelatedEntityList(
  listItems: ListItems,
  relatedSearchResult: RelatedSearchResult | undefined,
  excludedValues: SelectedFilterValue | undefined
): RelatedListItems {
  if (relatedSearchResult) {
    const { resultKey, searchKey, values } = relatedSearchResult;
    return listItems?.filter((listItem) => {
      if (values.includes(listItem[resultKey].toLowerCase())) {
        return !excludedValues?.includes(listItem[searchKey]); // Exclude any row where any of the selected category values matches the corresponding row value.
      }
    });
  }
}

/**
 * Updates related entity list.
 */
export const useEntityListRelatedView = (): void => {
  const { exploreDispatch, exploreState } = useContext(ExploreStateContext);
  const { filterState, listItems, tabValue } = exploreState;
  const { listView } = getEntityConfig(tabValue);
  const relatedView = listView?.relatedView;
  const { relatedSearchFn, resultKey, searchKey } = relatedView || {};
  const { data: relatedSearchResult, run } = useAsync<
    RelatedSearchResult | undefined
  >();
  const selectedCategoryValues = filterState.find(
    ({ categoryKey }) => categoryKey === searchKey
  )?.value;

  useEffect(() => {
    if (relatedSearchFn) {
      run(relatedSearchFn(searchKey, resultKey, selectedCategoryValues));
    }
  }, [relatedSearchFn, resultKey, run, searchKey, selectedCategoryValues]);

  useEffect(() => {
    exploreDispatch({
      payload: {
        relatedListItems: buildRelatedEntityList(
          listItems,
          relatedSearchResult,
          selectedCategoryValues
        ),
      },
      type: ExploreActionKind.ProcessRelatedResponse,
    });
  }, [exploreDispatch, listItems, relatedSearchResult, selectedCategoryValues]);
};

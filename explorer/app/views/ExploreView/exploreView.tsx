import { Tabs, TabValue } from "app/components/common/Tabs/tabs";
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { TableCreator } from "app/components/TableCreator/tableCreator";
import { useEntityList } from "app/hooks/useEntityList";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import {
  AzulEntitiesStaticResponse,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import {
  ExploreActionKind,
  ExploreState,
  ExploreStateContext,
} from "../../common/context/exploreState";
import { CategoryKey, CategoryValueKey } from "../../common/entities";
import { Filters } from "../../components/Filter/components/Filters/filters";
import { Index as IndexView } from "../../components/Index/index";
import { SidebarLabel } from "../../components/Layout/components/Sidebar/components/SidebarLabel/sidebarLabel";
import { Sidebar } from "../../components/Layout/components/Sidebar/sidebar";
import { EntityConfig, SummaryConfig } from "../../config/common/entities";
import { config, getEntityConfig, getTabs } from "../../config/config";
import { useEntityListRelatedView } from "../../hooks/useEntityListRelatedView";
import { useSummary } from "../../hooks/useSummary";

// TODO(Dave) create an interface for props and maybe not drill the static load through here
export const ExploreView = (props: AzulEntitiesStaticResponse): JSX.Element => {
  const { explorerTitle, summaryConfig } = config(); // Get app level config.
  const { exploreDispatch, exploreState } = useContext(ExploreStateContext); // Get the useReducer state and dispatch for "Explore".
  const { categoryViews, isRelatedView, tabValue } = exploreState;
  const entityConfig = getEntityConfig(tabValue); // Entity config.
  const { push } = useRouter();
  const tabs = getTabs();
  const { response: summaryResponse } = useSummary(); // Fetch summary.
  useEntityList(props); // Fetch entities.
  useEntityListRelatedView(); // Fetch related entities.
  const { entityListType } = props;

  /**
   * Callback fired when selected state of a category value is toggled.
   * @param categoryKey - The category being filtered.
   * @param selectedCategoryValue - The value to set or clear.
   * @param selected - Indication of whether the selected value is being set or cleared.
   */
  const onFilterChange = (
    categoryKey: CategoryKey,
    selectedCategoryValue: CategoryValueKey,
    selected: boolean
  ): void => {
    exploreDispatch({
      payload: {
        categoryKey,
        selected,
        selectedValue: selectedCategoryValue,
      },
      type: ExploreActionKind.UpdateFilter,
    });
  };

  /**
   * Callback fired when selected tab value changes.
   * - Sets state tabsValue to selected tab value.
   * - Executes a pushState and resets pagination.
   * @param tabValue - Selected tab value.
   */
  const onTabChange = (tabValue: TabValue): void => {
    push(`/${tabValue}`);
  };

  // Selects entity type with update to entity list type.
  useEffect(() => {
    if (entityListType) {
      exploreDispatch({
        payload: entityListType,
        type: ExploreActionKind.SelectEntityType,
      });
    }
  }, [entityListType, exploreDispatch]);

  return (
    <>
      {categoryViews && !!categoryViews.length && (
        <Sidebar Label={<SidebarLabel label={"Filters"} />}>
          <Filters
            categoryViews={categoryViews}
            disabled={isRelatedView}
            onFilter={onFilterChange}
          />
        </Sidebar>
      )}
      <IndexView
        entities={renderEntities(exploreState, entityConfig, entityListType)}
        Summaries={renderSummary(exploreState, summaryConfig, summaryResponse)}
        Tabs={<Tabs onTabChange={onTabChange} tabs={tabs} value={tabValue} />}
        title={explorerTitle}
      />
    </>
  );
};

/**
 * Render either a loading view, empty result set notification or the table itself.
 * @param exploreState - ExploreView responses from Azul, such as projects (index/projects), samples (index/samples) and files (index/files).
 * @param entityConfig - Entity configuration.
 * @param entityListType - Entity list type.
 * @returns rendered Table component.
 */
function renderEntities(
  exploreState: ExploreState,
  entityConfig: EntityConfig,
  entityListType: string
): JSX.Element {
  const {
    isRelatedView,
    listItems,
    loading,
    paginationState,
    relatedListItems,
    tabValue,
  } = exploreState;
  const { list, listView, staticLoad } = entityConfig;
  const { columns: columnsConfig, defaultSort } = list;
  const { disablePagination = false } = listView || {};

  if (!exploreState || !tabValue) {
    return <></>; //TODO: return the loading UI component
  }

  if (entityListType !== tabValue) {
    // required currently for static load site as the pre-rendered page
    // loads with the previous tabs data on the first render after switching tabs. (or similar)
    //console.log("Entity list type != tab value", entityListType, tabValue);
    return <></>; // TODO(Fran) review loading and return.
  }

  return (
    <TableCreator
      columns={columnsConfig}
      defaultSort={defaultSort}
      disablePagination={disablePagination}
      items={
        isRelatedView && relatedListItems ? relatedListItems : listItems ?? []
      }
      loading={loading}
      pages={paginationState.pages}
      pageSize={paginationState.pageSize}
      pagination={undefined}
      staticallyLoaded={staticLoad}
      total={paginationState.rows}
    />
  );
}

/**
 * Renders Summaries component when all the following requirements are fulfilled:
 * - defined summary config,
 * - valid summary response, and
 * - defined summaries transformed from the given summary response.
 * @param exploreState - Global state.
 * @param summaryConfig - Summary config.
 * @param summaryResponse - Response model return from summary API.
 * @returns rendered Summaries component.
 */
function renderSummary(
  exploreState: ExploreState,
  summaryConfig?: SummaryConfig,
  summaryResponse?: AzulSummaryResponse
): JSX.Element | undefined {
  if (!summaryConfig || !summaryResponse) {
    return;
  }
  /* Render the Summaries component. */
  return (
    <ComponentCreator
      components={summaryConfig.components}
      response={summaryResponse}
    />
  );
}

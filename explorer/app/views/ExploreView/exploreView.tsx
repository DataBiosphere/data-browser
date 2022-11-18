import { Tabs, TabValue } from "app/components/common/Tabs/tabs";
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { NoResults } from "app/components/NoResults/noResults";
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
import { SummaryConfig } from "../../config/common/entities";
import { config, getEntityConfig, getTabs } from "../../config/config";
import { useSummary } from "../../hooks/useSummary";

// TODO(Dave) create an interface for props and maybe not drill the static load through here
export const ExploreView = (props: AzulEntitiesStaticResponse): JSX.Element => {
  // Get app level config
  const { disablePagination, explorerTitle, summaryConfig } = config();

  // Get the useReducer state and dispatch for "Explore"
  const { exploreDispatch, exploreState } = useContext(ExploreStateContext);

  const { categoryViews, sortState, tabValue } = exploreState;
  const { push } = useRouter();
  const { list, listView, staticLoad } = getEntityConfig(tabValue);

  const { columns: columnsConfig } = list;
  const tabs = getTabs();
  const { response: summaryResponse } = useSummary(); // Fetch summary.
  //const { loading, pagination, response } = useEntityList(props); // Fetch entities.
  useEntityList(props); // Fetch entities.
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

  /**
   * Render either a loading view, empty result set notification or the table itself.
   * @param exploreState - ExploreView responses from Azul, such as projects (index/projects), samples (index/samples) and files (index/files).
   * @returns Element to render.
   */
  const renderContent = (exploreState: ExploreState): JSX.Element => {
    if (!exploreState || !tabValue) {
      return <></>; //TODO: return the loading UI component
    }

    if (entityListType !== tabValue) {
      // required currently for static load site as the pre-rendered page
      // loads with the previous tabs data on the first render after switching tabs. (or similar)
      //console.log("Entity list type != tab value", entityListType, tabValue);
      return <></>; // TODO(Fran) review loading and return.
    }

    if (
      !exploreState.loading &&
      (!exploreState.listItems || exploreState.listItems.length === 0)
    ) {
      return (
        <NoResults
          // actions={
          //   <>
          //     <ButtonPrimary
          //       onClick={(): void => console.log("Remove last filter")} // TODO create "remove last filter" function
          //     >
          //       Remove last filter
          //     </ButtonPrimary>
          //     <ButtonSecondary
          //       onClick={(): void => console.log("Clear all filters")} // TODO create "clear all filters" function
          //     >
          //       Clear all filters
          //     </ButtonSecondary>
          //   </>
          // }
          title={"No Results found"}
        />
      );
    }

    return (
      <TableCreator
        columns={columnsConfig}
        exploreState={exploreState}
        items={exploreState.listItems ?? []}
        listView={listView}
        pageSize={exploreState.paginationState.pageSize}
        total={exploreState.paginationState.rows}
        pagination={undefined}
        sort={sortState}
        pages={exploreState.paginationState.pages}
        loading={exploreState.loading}
        staticallyLoaded={staticLoad}
        disablePagination={disablePagination}
      />
    );
  };

  return (
    <>
      {categoryViews && !!categoryViews.length && (
        <Sidebar Label={<SidebarLabel label={"Filters"} />}>
          <Filters categoryViews={categoryViews} onFilter={onFilterChange} />
        </Sidebar>
      )}
      <IndexView
        entities={renderContent(exploreState)}
        Summaries={renderSummary(exploreState, summaryConfig, summaryResponse)}
        Tabs={<Tabs onTabChange={onTabChange} tabs={tabs} value={tabValue} />}
        title={explorerTitle}
      />
    </>
  );
};

/**
 * Renders Summaries component when all the following requirements are fulfilled:
 * - defined summary config,
 * - valid summary response, and
 * - defined summaries transformed from the given summary response.
 * @param exploreState - the application global state
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

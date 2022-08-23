import {
  Tab,
  Tabs,
  TabsValue,
  TabValue,
} from "app/components/common/Tabs/tabs";
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { NoResults } from "app/components/NoResults/noResults";
import { TableCreator } from "app/components/TableCreator/tableCreator";
import { useConfig } from "app/hooks/useConfig";
import { useCurrentEntity } from "app/hooks/useCurrentEntity";
import { useFetchEntities } from "app/hooks/useFetchEntities";
import { useResetableState } from "app/hooks/useResetableState";
import { useSummary } from "app/hooks/useSummary";
import { useRouter } from "next/router";
import React from "react";
import {
  AzulEntitiesResponse,
  AzulEntitiesStaticResponse,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { Filters } from "../../components/Filter/components/Filters/filters";
import { Index as IndexView } from "../../components/Index/index";
import { SidebarLabel } from "../../components/Layout/components/Sidebar/components/SidebarLabel/sidebarLabel";
import { Sidebar } from "../../components/Layout/components/Sidebar/sidebar";
import { EntityConfig, SummaryConfig } from "../../config/common/entities";

/**
 * Returns tabs to be used as a prop for the Tabs component.
 * @param entities - Entity configs related to the /explore/projects, /explore/files and /explore/samples route.
 * @returns tabs list.
 */
function getTabs(entities: EntityConfig[]): Tab[] {
  return entities.map(({ label, route }) => ({
    label,
    value: route,
  }));
}

/**
 * Renders Summaries component when all the following requirements are fulfilled:
 * - defined summary config,
 * - valid summary response, and
 * - defined summaries transformed from the given summary response.
 * @param summaryConfig - Summary config.
 * @param summaryResponse - Response model return from summary API.
 * @returns rendered Summaries component.
 */
function renderSummary(
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

export const Index = (props: AzulEntitiesStaticResponse): JSX.Element => {
  // Determine the current site config
  const config = useConfig();

  // Determine the current entity (e.g. projects, files, samples) and config.
  const entity = useCurrentEntity();
  const { entities, entityTitle, summaryConfig } = useConfig();

  const route = entity?.route;
  const { push } = useRouter();

  // Init tabs state.
  const [tabsValue, setTabsValue] = useResetableState<TabsValue>(route);
  const tabs = getTabs(entities);

  // Fetch summary and entities.
  const { response: summaryResponse } = useSummary();
  const { categories, loading, onFilter, pagination, response, sort } =
    useFetchEntities(props);

  // Grab the column config for the current entity.
  const columnsConfig = entity?.list?.columns;

  /**
   * Callback fired when selected tab value changes.
   * - Sets state tabsValue to selected tab value.
   * - Executes a pushState and resets pagination.
   * @param tabValue - Selected tab value.
   */
  const onTabChange = (tabValue: TabValue): void => {
    setTabsValue(tabValue); // Set state tabsValue prior to route change to indicate selection success.
    push(`/${tabValue}`);
    pagination?.resetPage();
  };

  /**
   * Render either a loading view, empty result set notification or the table itself.
   * @param entitiesResponse - Index responses from Azul, such as projects (index/projects), samples (index/samples) and files (index/files).
   * @returns Element to render.
   */
  const renderContent = (
    entitiesResponse?: AzulEntitiesResponse
  ): JSX.Element => {
    if (!entitiesResponse) {
      return <></>; //TODO: return the loading UI component
    }

    if (entitiesResponse.hits.length === 0) {
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
        items={entitiesResponse.hits}
        pageSize={entitiesResponse.pagination.size}
        total={entitiesResponse.pagination.total}
        pageCount={entitiesResponse.pagination.count}
        pagination={pagination}
        sort={sort}
        pages={entitiesResponse.pagination.pages}
        loading={loading}
        staticallyLoaded={entity.staticLoad}
        disablePagination={config.disablePagination}
      />
    );
  };

  return (
    <>
      {categories && !!categories.length && (
        <Sidebar Label={<SidebarLabel label={"Filters"} />}>
          <Filters categories={categories} onFilter={onFilter} />
        </Sidebar>
      )}
      <IndexView
        entities={renderContent(response)}
        Summaries={renderSummary(summaryConfig, summaryResponse)}
        Tabs={<Tabs onTabChange={onTabChange} tabs={tabs} value={tabsValue} />}
        title={entityTitle}
      />
    </>
  );
};

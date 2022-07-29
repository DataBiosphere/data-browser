// Core dependencies
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

// App dependencies
import {
  Tab,
  Tabs,
  TabsValue,
  TabValue,
} from "app/components/common/Tabs/tabs";
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { TableCreator } from "app/components/TableCreator/tableCreator";
import { useConfig } from "app/hooks/useConfig";
import { useCurrentEntity } from "app/hooks/useCurrentEntity";
import { useFetchEntities } from "app/hooks/useFetchEntities";
import { useSummary } from "app/hooks/useSummary";
import { Index as IndexView } from "../../components/Index/index";
import {
  AzulEntitiesStaticResponse,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { useCategoryFilter } from "../../hooks/useCategoryFilter";
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
  summaryConfig: SummaryConfig,
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
  const { entities, entityTitle, summary } = useConfig();

  const route = entity?.route;
  const { push } = useRouter();

  // Init tabs state.
  const [tabsValue, setTabsValue] = useState<TabsValue>(route);
  const tabs = getTabs(entities);

  // Fetch summary and entities.
  const { response: summaryResponse } = useSummary();
  const { categories, loading, pagination, response, setFilter, sort } =
    useFetchEntities(props, []);

  // Init filter functionality.
  const { categories: categoryViews, onFilter } = useCategoryFilter(
    categories,
    setFilter
  );

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
   * @returns Element to render.
   */
  const renderContent = (): JSX.Element => {
    if (!response) {
      return <></>; //TODO: return the loading UI component
    }

    if (!response.hits) {
      return <span>EMPTY LIST</span>; //TODO: return the empty list UI component
    }

    return (
      <TableCreator
        columns={columnsConfig}
        items={response.hits}
        pageSize={response.pagination.size}
        total={response.pagination.pages}
        pagination={pagination}
        sort={sort}
        loading={loading}
        disablePagination={config.disablePagination}
      />
    );
  };

  return (
    <>
      {categoryViews && !!categoryViews.length && (
        <Sidebar>
          {categoryViews.map((categoryView, index) => (
            <Fragment key={index}>
              <div>
                <b>{categoryView.label}</b>
              </div>
              {categoryView.values.map((categoryValueView, j) => (
                <div
                  key={j}
                  onClick={(): void =>
                    onFilter(
                      categoryView.key,
                      categoryValueView.key,
                      !categoryValueView.selected
                    )
                  }
                >
                  {categoryValueView.selected ? <>&#9889;</> : null}{" "}
                  {categoryValueView.label} {categoryValueView.count}
                  {categoryValueView.selected ? <>&#9889;</> : null}
                </div>
              ))}
            </Fragment>
          ))}
        </Sidebar>
      )}
      <IndexView
        entities={renderContent()}
        Summaries={renderSummary(summary, summaryResponse)}
        Tabs={<Tabs onTabChange={onTabChange} tabs={tabs} value={tabsValue} />}
        title={entityTitle}
      />
    </>
  );
};

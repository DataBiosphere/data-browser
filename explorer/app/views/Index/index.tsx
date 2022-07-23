// Core dependencies
import { useRouter } from "next/router";
import React, { useState } from "react";

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
import { EntityConfig, SummaryConfig } from "../../config/model";
import { SummaryResponse } from "../../models/responses";
import { ListModel } from "../../models/viewModels";

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
  summaryResponse?: SummaryResponse
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

export const Index = (props: ListModel): JSX.Element => {
  const entity = useCurrentEntity();
  const route = entity?.route;
  const [tabsValue, setTabsValue] = useState<TabsValue>(route);
  const { entities, entityTitle, summary } = useConfig();
  const { response: summaryResponse } = useSummary();
  const { response, isLoading, pagination, sort } = useFetchEntities(props);
  const { push } = useRouter();
  const columnsConfig = entity?.list?.columns;
  const tabs = getTabs(entities);

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

  const renderContent = (): JSX.Element => {
    if (isLoading || !response) {
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
      />
    );
  };

  return (
    <IndexView
      entities={renderContent()}
      Summaries={renderSummary(summary, summaryResponse)}
      Tabs={<Tabs onTabChange={onTabChange} tabs={tabs} value={tabsValue} />}
      title={entityTitle}
    />
  );
};

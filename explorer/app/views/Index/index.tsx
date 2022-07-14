// Core dependencies
import { useRouter } from "next/router";
import React from "react";

// App dependencies
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { TableCreator } from "app/components/TableCreator/tableCreator";
import { Tabs } from "app/components/Tabs/tabs";
import { useConfig } from "app/hooks/useConfig";
import { useCurrentEntity } from "app/hooks/useCurrentEntity";
import { useFetchEntities } from "app/hooks/useFetchEntities";
import { useSummary } from "app/hooks/useSummary";
import { Index as IndexView } from "../../components/Index/index";
import { SummaryConfig } from "../../config/model";
import { SummaryResponse } from "../../models/responses";
import { ListModel } from "../../models/viewModels";

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
  /* Grab the "Summaries" component. */
  const summaryComponents = summaryConfig.components;
  if (!Array.isArray(summaryComponents)) {
    return;
  }
  const summariesComponent = summaryComponents.find(
    (component) => component.component.name === "Summaries"
  );
  /* Grab the prop "summaries". */
  const summaries =
    summariesComponent?.transformer &&
    summariesComponent.transformer(summaryResponse).summaries;
  /* If the prop "summaries" is undefined, we do not want to render the Summaries component or the styled container "Widgets" around the summary. */
  if (!summaries) {
    return;
  }
  /* Render the Summaries component. */
  return (
    <ComponentCreator
      components={summaryComponents}
      response={summaryResponse}
    />
  );
}

export const Index = (props: ListModel): JSX.Element => {
  const entity = useCurrentEntity();
  const { entities, entityTitle, summary } = useConfig();
  const { response: summaryResponse } = useSummary();
  const { response, isLoading, pagination, sort } = useFetchEntities(props);
  const { asPath, push } = useRouter();
  const columnsConfig = entity?.list?.columns;

  const renderContent = (): JSX.Element => {
    if (isLoading || !response) {
      return <span>LOADING...</span>; //TODO: return the loading UI component
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

  const handleTabChanged = (newIndex: number): void => {
    push(entities[newIndex].route);
    pagination?.resetPage();
  };

  const selectedTab = entities.findIndex(({ route }) => asPath.includes(route));
  const tabs = entities.map(({ label }) => label);

  return (
    <IndexView
      entities={renderContent()}
      Summaries={renderSummary(summary, summaryResponse)}
      Tabs={
        <Tabs
          onTabChange={handleTabChanged}
          selectedTab={selectedTab}
          tabs={tabs}
        />
      }
      title={entityTitle}
    />
  );
};

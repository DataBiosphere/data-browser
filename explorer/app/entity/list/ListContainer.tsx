/**
 * Container component that will wrap all presentational components used by and entity list page.
 */
import React from "react";
import { useRouter } from "next/router";
import { TableCreator } from "app/components/TableCreator/tableCreator";
import { Tabs } from "app/components/Tabs/tabs";
import { useConfig } from "app/hooks/useConfig";
import { useCurrentEntity } from "app/hooks/useCurrentEntity";
import { useFetchEntities } from "app/hooks/useFetchEntities";
import { ListModel } from "../../models/viewModels";
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { useSummary } from "app/hooks/useSummary";

export const ListContainer = (props: ListModel): JSX.Element => {
  const entity = useCurrentEntity();
  const { entities, summary } = useConfig();
  const { response: summaryResponse } = useSummary();
  const { response, isLoading, pagination, sort } = useFetchEntities(props);
  const { asPath, push } = useRouter();
  const columnsConfig = entity.list.columns;
  const summaryComponents = summary?.components;

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
    <>
      {summaryComponents && (
        <ComponentCreator
          components={summaryComponents}
          response={summaryResponse}
        />
      )}
      <Tabs
        onTabChange={handleTabChanged}
        selectedTab={selectedTab}
        tabs={tabs}
      />
      {renderContent()}
    </>
  );
};

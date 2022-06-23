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

export const ListContainer = (props: ListModel) => {
  const entity = useCurrentEntity();
  const { entities } = useConfig();
  const { response, isLoading, pagination } = useFetchEntities(props);
  const { asPath, push } = useRouter();
  const columnsConfig = entity?.list?.columns;

  if (!columnsConfig || !entity) {
    return <span>EMPTY CONFIG</span>; //TODO: return the empty config UI component
  }

  const renderContent = () => {
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
      />
    );
  };

  const handleTabChanged = (newIndex: number) => {
    push(entities[newIndex].route);
    pagination?.resetPage();
  };

  const selectedTab = entities.findIndex(({ route }) => asPath.includes(route));
  const tabs = entities.map(({ label }) => ({ label }));

  return (
    <>
      <Tabs
        onTabChange={handleTabChanged}
        selectedTab={selectedTab}
        tabs={tabs}
      >
        {renderContent()}
      </Tabs>
    </>
  );
};

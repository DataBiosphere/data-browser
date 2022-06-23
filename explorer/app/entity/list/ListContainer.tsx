/**
 * Container component that will wrap all presentational components used by and entity list page.
 */
import { TableCreator } from "app/components/TableCreator/tableCreator";
import { useCurrentEntity } from "app/hooks/useCurrentEntity";
import { useFetchEntities } from "app/hooks/useFetchEntities";
import React from "react";
import { ListModel } from "../../models/viewModels";

export const ListContainer = (props: ListModel) => {
  const entity = useCurrentEntity();
  const { response, isLoading, pagination } = useFetchEntities(props);
  const columnsConfig = entity?.list?.columns;

  if (!entity || isLoading || !response) {
    return <span>LOADING...</span>; //TODO: return the loading UI component
  }

  if (!columnsConfig) {
    return <span>EMPTY CONFIG</span>; //TODO: return the empty config UI component
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

/**
 * Container component that will wrap all presentational components used by and entity list page.
 */
import { useCurrentEntity } from "app/hooks/useCurrentEntity";
import { useFetchEntities } from "app/hooks/useFetchEntities";
import Link from "next/link";
import React from "react";
import { Column } from "react-table";
import { Table } from "../../components/Table/Table";
import { ListViewModel } from "../../models/viewModels";

interface TableItem {
  label: string;
  url: string;
}

const columnsConfig: Column<TableItem>[] = [
  {
    accessor: "label",
    Header: "Project Name",
    Cell: (item) => (
      <Link href={item.row.original.url}>
        <a>{item.row.original.label}</a>
      </Link>
    ),
  },
];

export const ListContainer = (props: ListViewModel) => {
  const entity = useCurrentEntity();
  const { data, isLoading } = useFetchEntities(props);

  if (!entity || isLoading || !data) {
    return <span>LOADING...</span>; //TODO: return the loading UI component
  }

  const tableItems: TableItem[] = data.items.map((item) => ({
    label: item.name,
    url: `/explore/${encodeURIComponent(entity.route)}/${encodeURIComponent(
      item.uuid
    )}`,
  }));

  return (
    <Table<TableItem>
      items={tableItems}
      columns={columnsConfig}
      pageSize={25}
    />
  );
};

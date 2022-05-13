/**
 * Container component that will wrap all presentational components used by the project's list page.
 */
import Link from "next/link";
import React from "react";
import { Column } from "react-table";
import { Table } from "../../components";
import { ProjectListViewModel } from "../../models";

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

export const ProjectListContainer = ({ items }: ProjectListViewModel) => {
  const tableItems: TableItem[] = items.map((item) => ({
    label: item.projectName,
    url: `/explore/projects/${item.uuid}`,
  }));

  return (
    <>
      <h1>Project List</h1>
      <Table<TableItem>
        items={tableItems}
        columns={columnsConfig}
        pageSize={25}
      />
    </>
  );
};

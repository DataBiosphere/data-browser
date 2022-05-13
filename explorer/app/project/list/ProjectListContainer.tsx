/**
 * Container component that will wrap all presentational components used by the project's list page.
 */
import Link from "next/link";
import React from "react";
import { LinkTable } from "../../components";
import { ProjectListViewModel } from "../../models";

export const ProjectListContainer = ({ items }: ProjectListViewModel) => {
  const tableItems = items.map((item) => ({
    label: item.projectName,
    url: `/explore/projects/${item.uuid}`,
  }));

  return (
    <>
      <h1>Project List</h1>
      <LinkTable items={tableItems} />
    </>
  );
};

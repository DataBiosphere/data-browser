import { GetStaticProps } from "next";
import React from "react";
import { Page } from "../../../app/components";
import { ProjectListViewModel } from "../../../app/models";
import { listAll as projectList } from "../../../app/project/api";
import { ProjectListContainer } from "../../../app/project/list";
import { TRANSFORMERS } from "../../../app/transformers";

const ProjectListPage: React.FC<ProjectListViewModel> = (
  props: ProjectListViewModel
) => {
  return (
    <Page>
      <ProjectListContainer {...props} />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projects = await projectList();
  return {
    props: TRANSFORMERS.project.list(projects),
  };
};

export default ProjectListPage;

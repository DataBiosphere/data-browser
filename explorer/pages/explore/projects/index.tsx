import { GetStaticProps } from "next";
import React from "react";
import { ProjectListViewModel } from "../../../app/models";
import { list as projectList } from "../../../app/project/api/service";
import { ProjectListContainer } from "../../../app/project/list";
import { TRANSFORMERS } from "../../../app/transformers";

const ProjectListPage: React.FC<ProjectListViewModel> = (
  props: ProjectListViewModel
) => {
  return <ProjectListContainer {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const projects = await projectList();
  return {
    props: TRANSFORMERS.project.list(projects),
  };
};

export default ProjectListPage;

import { GetStaticProps } from "next";
import React from "react";
import { HeaderProps, Page } from "../../../app/components";
import { ProjectListViewModel } from "../../../app/models";
import { listAll as projectList } from "../../../app/project/api";
import { ProjectListContainer } from "../../../app/project/list";
import { TRANSFORMERS } from "../../../app/transformers";

//TODO: This will be deleted on the configuration issue
const headerConfig: HeaderProps = {
  authenticationEnabled: true,
  searchEnabled: true,
  logo: {
    slogan: "NHGRI Analysis Visualization and Informatics Lab-space",
    url: "https://www.webhostingsecretrevealed.net/wp-content/uploads/logo-nightwatch-300x300.jpg",
    width: 30,
    height: 30,
  },
  navAlignment: "center",
  navLinks: {
    links: [
      {
        label: "Google",
        url: "https://google.com",
      },
      {
        label: "Github",
        url: "https://github.com",
      },
    ],
  },
  socialLinks: {
    links: [
      {
        type: "github",
        url: "https://github.com/BruceRodrigues",
      },
    ],
  },
};

const ProjectListPage: React.FC<ProjectListViewModel> = (
  props: ProjectListViewModel
) => {
  return (
    <Page header={headerConfig}>
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

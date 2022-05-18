import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { HeaderProps, Page } from "../../../app/components";
import { ProjectViewModel } from "../../../app/models";
import {
  listAll as projectList,
  detail as projectDetail,
} from "../../../app/project/api";
import { ProjectDetailContainer } from "../../../app/project/detail";
import { TRANSFORMERS } from "../../../app/transformers";

interface PageUrl extends ParsedUrlQuery {
  uuid: string;
}

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

const ProjectDetailPage: React.FC<ProjectViewModel> = (
  props: ProjectViewModel
) => {
  return (
    <Page header={headerConfig}>
      <ProjectDetailContainer {...props} />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await projectList();
  const paths = projects.hits.map((hit) => ({
    params: {
      uuid: hit.projects[0].projectId,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const data = await projectDetail((params as PageUrl).uuid);
  return {
    props: TRANSFORMERS.project.detail(data),
  };
};

export default ProjectDetailPage;

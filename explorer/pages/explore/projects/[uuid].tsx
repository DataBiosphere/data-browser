import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
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

const ProjectDetailPage: React.FC<ProjectViewModel> = (
  props: ProjectViewModel
) => {
  return <ProjectDetailContainer {...props} />;
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

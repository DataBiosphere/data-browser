// Core dependencies
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";

// App dependencies
import { Page } from "../../../app/components/Page/page";
import { config } from "app/config/config";
import { detail, listAll } from "../../../app/entity/api/service";
import { getCurrentEntity } from "app/hooks/useCurrentEntity";
import { DetailModel } from "../../../app/models/viewModels";
import { Project } from "../../../app/views/Project/project";

interface PageUrl extends ParsedUrlQuery {
  slug: string;
  uuid: string;
}

const ProjectPage = (props: DetailModel): JSX.Element => {
  return (
    <Page>
      <Project {...props} />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths<PageUrl> = async () => {
  const entities = config().entities;

  const paths = await Promise.all(
    entities.map(async (entity) => {
      if (entity.staticLoad && entity.getId) {
        const data = await listAll(entity.apiPath);
        return data.hits.map((hit) => ({
          params: {
            slug: entity.route,
            uuid: entity.getId?.(hit) ?? "",
          },
        }));
      }
      return [];
    })
  );

  const result = paths
    .reduce((prev, curr) => [...prev, ...curr], [])
    .filter(({ params }) => !!params);

  return {
    fallback: true,
    paths: result,
  };
};

export const getStaticProps: GetStaticProps<DetailModel> = async ({
  params,
}: GetStaticPropsContext) => {
  const { slug } = params as PageUrl;
  const entity = getCurrentEntity(slug, config());
  const props: DetailModel = {};
  if (entity?.staticLoad) {
    const data = await detail((params as PageUrl).uuid, entity.apiPath);
    props.data = data;
  }
  return {
    props,
  };
};

export default ProjectPage;

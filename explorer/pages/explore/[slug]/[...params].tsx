// Core dependencies
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";

// App dependencies
import { Page } from "../../../app/components/Layout/components/Page/page";
import { config } from "app/config/config";
import { detail, listAll } from "../../../app/entity/api/service";
import { getCurrentEntity } from "app/hooks/useCurrentEntity";
import { DetailModel } from "../../../app/models/viewModels";
import { Project } from "../../../app/views/Project/project";
import { PARAMS_INDEX_UUID } from "app/shared/constants";

interface PageUrl extends ParsedUrlQuery {
  slug: string;
  params: string[];
}

interface ProjectPageProps extends DetailModel {
  slug: string;
}

const ProjectPage = ({ slug, ...props }: ProjectPageProps): JSX.Element => {
  if (!slug) return <></>;

  const entity = getCurrentEntity(slug, config());

  return (
    <Page entity={entity}>
      <Project {...props} />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths<PageUrl> = async () => {
  const entities = config().entities;

  const paths = await Promise.all(
    entities.map(async (entity) => {
      const resultParams: { params: PageUrl }[] = [];
      if (entity.staticLoad && entity.getId) {
        const data = await listAll(entity.apiPath);
        const tabs = entity.detail?.tabs.map((tab) => tab.route) ?? [];

        data.hits.forEach((hit) => {
          tabs.forEach((tab) => {
            resultParams.push({
              params: {
                params: [entity.getId?.(hit) ?? "", tab],
                slug: entity.route,
              },
            });
          });
        });
      }
      return resultParams;
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

  if (!entity) {
    return {
      notFound: true,
    };
  }

  const props: ProjectPageProps = { slug };
  if (entity.staticLoad) {
    const data = await detail(
      (params as PageUrl).params[PARAMS_INDEX_UUID],
      entity.apiPath
    );
    props.data = data;
  }
  return {
    props,
  };
};

export default ProjectPage;

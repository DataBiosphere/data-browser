// Core dependencies
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";

// App dependencies
import { Page } from "../../app/components/Layout/components/Page/page";
import { config } from "app/config/config";
import { getFetcher } from "app/hooks/useFetcher";
import { getCurrentEntity } from "app/hooks/useCurrentEntity";
import { PARAMS_INDEX_UUID } from "app/shared/constants";
import { AzulEntityStaticResponse } from "../../app/apis/azul/common/entities";
import { BackPage } from "../../app/views/BackPage/backPage";

interface PageUrl extends ParsedUrlQuery {
  params: string[];
  slug: string;
}

interface ProjectPageProps extends AzulEntityStaticResponse {
  slug: string;
}

const ProjectPage = ({ slug, ...props }: ProjectPageProps): JSX.Element => {
  if (!slug) return <></>;

  const entity = getCurrentEntity(slug, config());

  return (
    <Page entity={entity}>
      <BackPage {...props} />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths<PageUrl> = async () => {
  const entities = config().entities;

  const paths = await Promise.all(
    entities.map(async (entity) => {
      const resultParams: { params: PageUrl }[] = [];
      if (entity.staticLoad && entity.getId) {
        const { listAll, path } = getFetcher(entity);
        const data = await listAll(path);
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

export const getStaticProps: GetStaticProps<AzulEntityStaticResponse> = async ({
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
    const { detail, path } = getFetcher(entity);
    const data = await detail(
      (params as PageUrl).params[PARAMS_INDEX_UUID],
      path
    );
    props.data = data;
  }
  return {
    props,
  };
};

export default ProjectPage;

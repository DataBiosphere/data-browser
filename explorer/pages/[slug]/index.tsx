// Core dependencies
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";

// App dependencies
import { Page } from "../../app/components/Layout/components/Page/page";
import { config } from "app/config/config";
import { EMPTY_PAGE } from "app/entity/api/constants";
import { listAll } from "app/entity/api/service";
import { getCurrentEntity } from "app/hooks/useCurrentEntity";
import { ListModel } from "../../app/models/viewModels";
import { Index } from "app/views/Index";

interface PageUrl extends ParsedUrlQuery {
  slug: string;
}

interface ListPageProps extends ListModel {
  slug: string;
}

const IndexPage = ({ slug, ...props }: ListPageProps): JSX.Element => {
  if (!slug) return <></>;
  const entity = getCurrentEntity(slug, config());

  return (
    <Page entity={entity}>
      <Index {...props} />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entities = config().entities;
  const paths = entities.map((entity) => ({
    params: {
      slug: entity.route,
    },
  }));
  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps: GetStaticProps<ListModel> = async (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params as PageUrl;
  const entity = getCurrentEntity(slug, config());

  if (!entity) {
    return {
      notFound: true,
    };
  }

  const resultList = entity.staticLoad
    ? await listAll(entity.apiPath)
    : EMPTY_PAGE;

  return {
    props: {
      data: resultList,
      slug,
    },
  };
};

export default IndexPage;

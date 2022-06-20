import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { Page } from "../../app/components/Page/page";
import { ListModel } from "../../app/models/viewModels";
import { ListContainer } from "../../app/entity/list/ListContainer";
import { config } from "app/config/config";
import { ParsedUrlQuery } from "querystring";
import { listAll } from "app/entity/api/service";
import { EMPTY_PAGE } from "app/entity/api/constants";
import { getCurrentEntity } from "app/hooks/useCurrentEntity";

interface PageUrl extends ParsedUrlQuery {
  slug: string;
}

const ListPage = (props: ListModel): JSX.Element => {
  return (
    <Page>
      <ListContainer {...props} />
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
    paths,
    fallback: true,
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
    },
  };
};

export default ListPage;

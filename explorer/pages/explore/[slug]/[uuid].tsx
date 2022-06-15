import { config } from "app/config/config";
import { getCurrentEntity } from "app/hooks/useCurrentEntity";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Page } from "../../../app/components/Page/page";
import { DetailModel } from "../../../app/models/viewModels";
import { detail, listAll } from "../../../app/entity/api/service";
import { DetailContainer } from "../../../app/entity/detail/DetailContainer";

interface PageUrl extends ParsedUrlQuery {
  uuid: string;
  slug: string;
}

const DetailPage = (props: DetailModel): JSX.Element => {
  return (
    <Page>
      <DetailContainer {...props} />
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
            uuid: entity.getId?.(hit) ?? "",
            slug: entity.route,
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
    paths: result,
    fallback: true,
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

export default DetailPage;

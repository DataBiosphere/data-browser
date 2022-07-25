// Core dependencies
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";

// App dependencies
import { Page } from "../../app/components/Layout/components/Page/page";
import { config } from "app/config/config";
import { EMPTY_PAGE } from "app/entity/api/constants";
import { getCurrentEntity } from "app/hooks/useCurrentEntity";
import { getFetcher } from "app/hooks/useFetcher";
import { Index } from "app/views/Index";
import { parseContentRows, readFile } from "app/utils/tsvParser";
import { AnvilSourceItem } from "app/models/responses";
import { database } from "app/utils/database";
import { AzulEntitiesStaticResponse } from "../../app/apis/azul/common/entities";

interface PageUrl extends ParsedUrlQuery {
  slug: string;
}

interface ListPageProps extends AzulEntitiesStaticResponse {
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

export const getStaticProps: GetStaticProps<
  AzulEntitiesStaticResponse
> = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as PageUrl;
  const entity = getCurrentEntity(slug, config());
  const fetcher = getFetcher(entity);

  if (entity.tsv) {
    const file = await readFile(entity.tsv.path);

    if (!file) {
      throw new Error(
        `File ${entity.tsv.path} not found for entity ${entity.label}`
      );
    }

    const result = await parseContentRows<AnvilSourceItem>(
      file,
      "\t",
      entity.tsv.sourceFieldKey,
      entity.tsv.sourceFieldType
    );
    database.get().seed(result);
  }

  const resultList =
    entity.staticLoad || entity.tsv
      ? await fetcher.listAll(fetcher.path)
      : EMPTY_PAGE;

  return {
    props: {
      data: resultList,
      slug,
    },
  };
};

export default IndexPage;

import { config } from "app/config/config";
import { EMPTY_PAGE } from "app/entity/api/constants";
import { getCurrentEntity } from "app/hooks/useCurrentEntity";
import { getFetcher } from "app/hooks/useFetcher";
import { database } from "app/utils/database";
import { parseContentRows, readFile } from "app/utils/tsvParser";
import { Index } from "app/views/Index";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { AzulEntitiesStaticResponse } from "../../app/apis/azul/common/entities";
import { Page } from "../../app/components/Layout/components/Page/page";

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

/**
 * Build the list of paths to be built statically.
 */
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

/**
 * Build the set of props for pre-rendering of page.
 * @param context - Object containing values related to the current context.
 */
export const getStaticProps: GetStaticProps<
  AzulEntitiesStaticResponse
> = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as PageUrl;
  const entity = getCurrentEntity(slug, config());

  // Determine the type of fetch, either from an API endpoint or a TSV.
  const fetcher = getFetcher(entity);

  // Build database from configured TSV, if any.
  if (entity.tsv) {
    const file = await readFile(entity.tsv.path);

    if (!file) {
      throw new Error(
        `File ${entity.tsv.path} not found for entity ${entity.label}`
      );
    }

    const result = await parseContentRows(
      file,
      "\t",
      entity.tsv.sourceFieldKey,
      entity.tsv.sourceFieldType
    );
    database.get().seed(result);
  }

  // Fetch the result set from either a configured API endpoint or from a local database seeded from a configured TSV.
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

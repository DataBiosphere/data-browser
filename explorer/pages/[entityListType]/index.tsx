import { config, getEntityConfig } from "app/config/config";
import { parseContentRows, readFile } from "app/utils/tsvParser";
import { ExploreView } from "app/views/ExploreView/exploreView";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { AzulEntitiesStaticResponse } from "../../app/apis/azul/common/entities";
import { Page } from "../../app/components/Layout/components/Page/page";
import { EMPTY_PAGE } from "../../app/entity/api/constants";
import { getEntityService } from "../../app/hooks/useEntityService";
import { database } from "../../app/utils/database";

interface PageUrl extends ParsedUrlQuery {
  entityListType: string;
}

interface ListPageProps extends AzulEntitiesStaticResponse {
  entityListType: string;
}

/**
 * Entity list component
 * @param listPageProps - props type for this component.
 * @param listPageProps.entityListType - as specified on the URL
 * @param listPageProps.props - dont know! //TODO what's in here?
 * @constructor
 */
const IndexPage = ({
  entityListType,
  ...props
}: ListPageProps): JSX.Element => {
  if (!entityListType) {
    return <></>;
  }

  const entityConfig = getEntityConfig(entityListType);

  return (
    <Page entity={entityConfig}>
      <ExploreView {...props} />
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
      entityListType: entity.route,
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
  const { entityListType } = context.params as PageUrl;
  const entityConfig = getEntityConfig(entityListType);

  // Determine the type of fetch, either from an API endpoint or a TSV.
  const fetcher = getEntityService(entityConfig);

  // Build database from configured TSV, if any.
  if (entityConfig.tsv) {
    const file = await readFile(entityConfig.tsv.path);

    if (!file) {
      throw new Error(
        `File ${entityConfig.tsv.path} not found for entity ${entityConfig.label}`
      );
    }

    const result = await parseContentRows(
      file,
      "\t",
      entityConfig.tsv.sourceFieldKey,
      entityConfig.tsv.sourceFieldType
    );
    database.get().seed(result);
  }

  // Fetch the result set from either a configured API endpoint or from a local database seeded from a configured TSV.
  const resultList =
    entityConfig.staticLoad || entityConfig.tsv
      ? await fetcher.fetchAllEntities(fetcher.path)
      : EMPTY_PAGE;

  return {
    props: {
      data: resultList,
      entityListType: entityListType,
    },
  };
};

export default IndexPage;

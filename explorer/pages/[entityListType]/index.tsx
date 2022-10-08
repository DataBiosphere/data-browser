import { config, getEntityConfig } from "app/config/config";
import { ExploreView } from "app/views/ExploreView/exploreView";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { AzulEntitiesStaticResponse } from "../../app/apis/azul/common/entities";
import { EntityConfig } from "../../app/config/common/entities";
import { EMPTY_PAGE } from "../../app/entity/api/constants";
import { getEntityService } from "../../app/hooks/useEntityService";
import { database } from "../../app/utils/database";
import { parseContentRows, readFile } from "../../app/utils/tsvParser";

interface PageUrl extends ParsedUrlQuery {
  entityListType: string;
}

interface ListPageProps extends AzulEntitiesStaticResponse {
  entityListType: string;
}

/**
 * Seed database.
 * @param entityListType - Entity list type.
 * @param entityConfig - Entity config.
 */
const seedDatabase = async function seedDatabase(
  entityListType: string,
  entityConfig: EntityConfig
): Promise<void> {
  const { label, tsv } = entityConfig;

  if (!tsv) {
    throw new Error(`TSV config not found for entity entity ${label}`);
  }

  const { builderFn, path: tsvPath, sourceFieldKey, sourceFieldType } = tsv;

  // Build database from configured TSV, if any.
  const file = await readFile(tsvPath);

  if (!file) {
    throw new Error(`File ${tsvPath} not found for entity ${label}`);
  }

  const result = await parseContentRows(
    file,
    "\t",
    sourceFieldKey,
    sourceFieldType
  );

  if (!result) {
    throw new Error(`Error parsing ${tsvPath}.`);
  }

  // Build entities.
  const entities = builderFn(result);

  // Seed entities.
  database.get().seed(entityListType, entities);
};

/**
 * Explore view page.
 * @param props - Explore view page props.
 * @param props.entityListType - Entity list type.
 * @returns Explore view component.
 */
const IndexPage = ({
  entityListType,
  ...props
}: ListPageProps): JSX.Element => {
  if (!entityListType) return <></>;
  return <ExploreView entityListType={entityListType} {...props} />;
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
    fallback: true, //TODO should this not be false? We have no server...
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
  const { tsv } = entityConfig;
  const { fetchAllEntities } = getEntityService(entityConfig); // Determine the type of fetch, either from an API endpoint or a TSV.

  // Seed database.
  if (entityConfig && tsv) {
    await seedDatabase(entityListType, entityConfig);
  }

  // Fetch the result set from either a configured API endpoint or from a local database seeded from a configured TSV.
  const resultList =
    entityConfig.staticLoad || entityConfig.tsv
      ? await fetchAllEntities(entityListType)
      : EMPTY_PAGE;

  return {
    props: {
      data: resultList,
      entityListType: entityListType,
    },
  };
};

export default IndexPage;

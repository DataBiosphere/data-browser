import { AzulEntitiesStaticResponse } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { Main as DXMain } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Main/main.styles";
import { EntityConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { getEntityConfig } from "@clevercanary/data-explorer-ui/lib/config/utils";
import { getEntityService } from "@clevercanary/data-explorer-ui/lib/hooks/useEntityService";
import { EXPLORE_MODE } from "@clevercanary/data-explorer-ui/lib/hooks/useExploreMode";
import { database } from "@clevercanary/data-explorer-ui/lib/utils/database";
import { ExploreView } from "@clevercanary/data-explorer-ui/lib/views/ExploreView/exploreView";
import { config } from "app/config/config";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { readFile } from "../../app/utils/tsvParser";

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
const seedDatabase = async function seedDatabase( // TODO get rid of this duplicated code
  entityListType: string,
  entityConfig: EntityConfig
): Promise<void> {
  const { label, staticLoadFile } = entityConfig;

  if (!staticLoadFile) {
    throw new Error(`staticLoadFile not found for entity entity ${label}`);
  }

  // Build database from configured TSV, if any.
  const rawData = await readFile(staticLoadFile);

  if (!rawData) {
    throw new Error(`File ${staticLoadFile} not found for entity ${label}`);
  }

  const object = JSON.parse(rawData.toString());
  const entities = Object.values(object); // Client-side fetched entities are mapped prior to dispatch to explore state.

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
  const appConfig = config();
  const entities = appConfig.entities;
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
  const appConfig = config();
  const { entityListType } = context.params as PageUrl;
  const { entities } = appConfig;
  const entityConfig = getEntityConfig(entities, entityListType);
  const { exploreMode } = entityConfig;
  const { fetchAllEntities } = getEntityService(entityConfig, undefined); // Determine the type of fetch, either from an API endpoint or a TSV.

  const props: AzulEntitiesStaticResponse = { entityListType };

  // Seed database.
  if (exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING) {
    await seedDatabase(entityListType, entityConfig);
  } else {
    // Entities are fetched server-side.
    return { props };
  }

  // Entities are client-side fetched from a local database seeded from a configured TSV.
  props.data = await fetchAllEntities(entityListType);

  return {
    props,
  };
};

IndexPage.Main = DXMain;

export default IndexPage;

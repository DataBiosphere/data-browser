import { AzulEntityStaticResponse } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import {
  PARAMS_INDEX_TAB,
  PARAMS_INDEX_UUID,
} from "@clevercanary/data-explorer-ui/lib/common/constants";
import { EntityConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { getEntityConfig } from "@clevercanary/data-explorer-ui/lib/config/utils";
import { getEntityService } from "@clevercanary/data-explorer-ui/lib/hooks/useEntityService";
import { database } from "@clevercanary/data-explorer-ui/lib/utils/database";
import { EntityDetailView } from "@clevercanary/data-explorer-ui/lib/views/EntityDetailView/entityDetailView";
import { config } from "app/config/config";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { EntityGuard } from "../../app/components/Detail/components/EntityGuard/entityGuard";
import { readFile } from "../../app/utils/tsvParser";
import { Override } from "../../app/viewModelBuilders/common/entities";

interface PageUrl extends ParsedUrlQuery {
  entityListType: string;
  params: string[];
}

export interface EntityDetailPageProps extends AzulEntityStaticResponse {
  entityListType: string;
  override?: Override;
}

/**
 * Entity detail view page.
 * @param props - Entity detail view page props.
 * @param props.entityListType - Entity list type.
 * @returns Entity detail view component.
 */
const EntityDetailPage = (props: EntityDetailPageProps): JSX.Element => {
  if (!props.entityListType) return <></>;
  if (props.override) return <EntityGuard override={props.override} />;
  return <EntityDetailView {...props} />;
};

/**
 * Returns a list of overrides from the override file.
 * @param entityConfig - Entity config.
 * @returns a list of overrides.
 */
const getOverrides = async function getOverrides(
  entityConfig: EntityConfig
): Promise<Override[]> {
  const { overrideFile } = entityConfig;
  if (!overrideFile) {
    return [];
  }
  const rawData = await readFile(overrideFile);
  if (!rawData) {
    return [];
  }
  const overrides = JSON.parse(rawData.toString());
  return (Object.values(overrides) || []) as unknown as Override[];
};

/**
 * Returns the override for the given entity ID.
 * @param overrides - Overrides.
 * @param entityId - Entity ID.
 * @returns returns the override for the given entity ID.
 */
function findOverride(
  overrides: Override[],
  entityId?: string
): Override | undefined {
  if (!entityId) {
    return;
  }
  return overrides.find(({ entryId }) => entryId === entityId);
}

/**
 * Returns true if the entity is a special case e.g. an "override".
 * @param override - Override.
 * @returns true if the entity is an override.
 */
function isOverride(override: Override): boolean {
  return Boolean(
    override.deprecated || override.supersededBy || override.withdrawn
  );
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
  const { label, staticEntityImportMapper, staticLoadFile } = entityConfig;

  if (!staticLoadFile) {
    throw new Error(`staticLoadFile not found for entity entity ${label}`);
  }

  // Build database from configured TSV, if any.
  const rawData = await readFile(staticLoadFile);

  if (!rawData) {
    throw new Error(`File ${staticLoadFile} not found for entity ${label}`);
  }

  const object = JSON.parse(rawData.toString());
  const entities = staticEntityImportMapper
    ? Object.values(object).map(staticEntityImportMapper)
    : Object.values(object);

  // Seed entities.
  database.get().seed(entityListType, entities);
};

/**
 * getStaticPaths - return the list of paths to prerender for each entity type and its tabs.
 */
export const getStaticPaths: GetStaticPaths<PageUrl> = async () => {
  const appConfig = config();
  const { entities } = appConfig;
  const paths = await Promise.all(
    entities.map(async (entityConfig) => {
      // Seed database.
      if (
        entityConfig &&
        entityConfig.staticLoad &&
        entityConfig.detail.staticLoad
      ) {
        await seedDatabase(entityConfig.route, entityConfig);
      }

      const resultParams: { params: PageUrl }[] = [];
      if (entityConfig.detail.staticLoad && entityConfig.getId) {
        const { fetchAllEntities, path } = getEntityService(
          entityConfig,
          undefined
        );
        const data = await fetchAllEntities(path);
        const tabs = entityConfig.detail?.tabs.map((tab) => tab.route) ?? [];

        // process all hits
        data.hits.forEach((hit) => {
          // process all tabs on each hit
          // TODO maybe we dont't want to pre-render the tabs.
          tabs.forEach((tab) => {
            resultParams.push({
              params: {
                entityListType: entityConfig.route,
                params: [entityConfig.getId?.(hit) ?? "", tab],
              },
            });
          });
        });
      }

      // process entity overrides
      if (entityConfig.overrideFile) {
        const overrides = await getOverrides(entityConfig);
        for (const override of overrides) {
          if (isOverride(override)) {
            resultParams.push({
              params: {
                entityListType: entityConfig.route,
                params: [override.entryId],
              },
            });
          }
        }
      }
      return resultParams;
    })
  );

  const result = paths
    .reduce((prev, curr) => [...prev, ...curr], [])
    .filter(({ params }) => !!params); // TODO why is this filter needed?

  return {
    fallback: false, // others e.g. true, blocking are not supported with next export
    paths: result,
  };
};

export const getStaticProps: GetStaticProps<AzulEntityStaticResponse> = async ({
  params,
}: GetStaticPropsContext) => {
  const appConfig = config();
  const { entityListType } = params as PageUrl;
  const { entities } = appConfig;
  const entityConfig = getEntityConfig(entities, entityListType);

  if (!entityConfig) {
    return {
      notFound: true,
    };
  }

  const props: EntityDetailPageProps = { entityListType: entityListType };

  // If there is a corresponding override for the given page, grab the override values from the override file and return as props.
  if (entityConfig.overrideFile) {
    const overrides = await getOverrides(entityConfig);
    const override = findOverride(
      overrides,
      params?.params?.[PARAMS_INDEX_UUID]
    );
    if (override && isOverride(override)) {
      props.override = override;
      return {
        props,
      };
    }
  }

  // If the entity detail view is to be "statically loaded", we need to seed the database (for retrieval of the entity), or
  // fetch the entity detail from API.
  if (entityConfig.detail.staticLoad) {
    // Seed database.
    if (entityConfig.staticLoad) {
      await seedDatabase(entityConfig.route, entityConfig);
    }
    // Grab the entity detail, either from database or API.
    const { fetchEntityDetail, path } = getEntityService(
      entityConfig,
      undefined
    );
    // When the entity detail is to be fetched from API, we only do so for the first tab.
    if (!entityConfig.staticLoad && params?.params?.[PARAMS_INDEX_TAB]) {
      return { props };
    }
    props.data = await fetchEntityDetail(
      (params as PageUrl).params[PARAMS_INDEX_UUID],
      path,
      undefined,
      undefined
    );
  }
  return {
    props,
  };
};

export default EntityDetailPage;

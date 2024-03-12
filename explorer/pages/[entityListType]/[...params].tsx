import { AzulEntityStaticResponse } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import {
  PARAMS_INDEX_TAB,
  PARAMS_INDEX_UUID,
} from "@clevercanary/data-explorer-ui/lib/common/constants";
import {
  EntityConfig,
  Override,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { getEntityConfig } from "@clevercanary/data-explorer-ui/lib/config/utils";
import { getEntityService } from "@clevercanary/data-explorer-ui/lib/hooks/useEntityService";
import { EXPLORE_MODE } from "@clevercanary/data-explorer-ui/lib/hooks/useExploreMode";
import { database } from "@clevercanary/data-explorer-ui/lib/utils/database";
import { EntityDetailView } from "@clevercanary/data-explorer-ui/lib/views/EntityDetailView/entityDetailView";
import { config } from "app/config/config";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { EntityGuard } from "../../app/components/Detail/components/EntityGuard/entityGuard";
import { readFile } from "../../app/utils/tsvParser";

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
    override.deprecated ||
      override.duplicateOf ||
      override.supersededBy ||
      override.withdrawn
  );
}

/**
 * Seed database.
 * @param entityListType - Entity list type.
 * @param entityConfig - Entity config.
 * @returns Promise<void>.
 */
const seedDatabase = async function seedDatabase(
  entityListType: string,
  entityConfig: EntityConfig
): Promise<void> {
  const { entityMapper, label, staticLoadFile } = entityConfig;

  if (!staticLoadFile) {
    throw new Error(`staticLoadFile not found for entity entity ${label}`);
  }

  // Build database from configured TSV, if any.
  const rawData = await readFile(staticLoadFile);

  if (!rawData) {
    throw new Error(`File ${staticLoadFile} not found for entity ${label}`);
  }

  const object = JSON.parse(rawData.toString());
  const entities = entityMapper
    ? Object.values(object).map(entityMapper)
    : Object.values(object);

  // Seed entities.
  database.get().seed(entityListType, entities);
};

/**
 * getStaticPaths - return the list of paths to prerender for each entity type and its tabs.
 * @returns Promise<GetStaticPaths<PageUrl>>.
 */
export const getStaticPaths: GetStaticPaths<PageUrl> = async () => {
  const appConfig = config();
  const { entities } = appConfig;
  const paths = await Promise.all(
    entities.map(async (entityConfig) => {
      const { exploreMode } = entityConfig;
      // Seed database.
      if (
        exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING &&
        entityConfig.detail.staticLoad
      ) {
        await seedDatabase(entityConfig.route, entityConfig);
      }

      const resultParams: { params: PageUrl }[] = [];

      // Fetch entity data.
      if (entityConfig.detail.staticLoad) {
        const { fetchAllEntities, path } = getEntityService(
          entityConfig,
          undefined
        );

        const data = await fetchAllEntities(path, undefined);
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
      if (entityConfig.overrides) {
        for (const override of entityConfig.overrides) {
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
    .filter(({ params }) => !!params);

  return {
    fallback: false, // others e.g. true, blocking are not supported with next export
    paths: result,
  };
};

export const getStaticProps: GetStaticProps<AzulEntityStaticResponse> = async ({
  params,
}: // eslint-disable-next-line sonarjs/cognitive-complexity -- ignore for now.
GetStaticPropsContext) => {
  const appConfig = config();
  const { entityListType } = params as PageUrl;
  const { entities } = appConfig;
  const entityConfig = getEntityConfig(entities, entityListType);
  const { exploreMode } = entityConfig;

  if (!entityConfig) {
    return {
      notFound: true,
    };
  }

  const props: EntityDetailPageProps = { entityListType: entityListType };

  // If there is a corresponding override for the given page, grab the override values from the override file and return as props.
  if (entityConfig.overrides) {
    const override = findOverride(
      entityConfig.overrides,
      params?.params?.[PARAMS_INDEX_UUID]
    );
    if (override && isOverride(override)) {
      props.override = override;
      if (override.duplicateOf) {
        props.override.duplicateOf = `/${entityListType}/${override.duplicateOf}`;
      }
      return {
        props,
      };
    }
  }

  // If the entity detail view is to be "statically loaded", we need to seed the database (for retrieval of the entity), or
  // fetch the entity detail from API.
  if (entityConfig.detail.staticLoad) {
    // Seed database.
    if (exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING) {
      await seedDatabase(entityConfig.route, entityConfig);
    }
    // Grab the entity detail, either from database or API.
    const { entityMapper, fetchEntity, fetchEntityDetail, path } =
      getEntityService(entityConfig, undefined);
    // When the entity detail is to be fetched from API, we only do so for the first tab.
    if (
      exploreMode === EXPLORE_MODE.SS_FETCH_SS_FILTERING &&
      params?.params?.[PARAMS_INDEX_TAB]
    ) {
      return { props };
    }

    if (exploreMode === EXPLORE_MODE.SS_FETCH_CS_FILTERING) {
      if (fetchEntity) {
        props.data = await fetchEntity(
          (params as PageUrl).params[PARAMS_INDEX_UUID],
          path,
          entityMapper
        );
      }
    } else {
      props.data = await fetchEntityDetail(
        (params as PageUrl).params[PARAMS_INDEX_UUID],
        path,
        undefined,
        undefined
      );
    }
  }

  return {
    props,
  };
};

export default EntityDetailPage;

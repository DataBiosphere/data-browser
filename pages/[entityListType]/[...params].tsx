import {
  AzulCatalogResponse,
  AzulEntitiesResponse,
  AzulEntityStaticResponse,
  AzulListParams,
} from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import {
  PARAMS_INDEX_EXPORT_METHOD,
  PARAMS_INDEX_TAB,
  PARAMS_INDEX_UUID,
} from "@databiosphere/findable-ui/lib/common/constants";
import {
  BackPageTabConfig,
  EntityConfig,
  Override,
} from "@databiosphere/findable-ui/lib/config/entities";
import { getEntityConfig } from "@databiosphere/findable-ui/lib/config/utils";
import { fetchCatalog } from "@databiosphere/findable-ui/lib/entity/api/service";
import { getEntityService } from "@databiosphere/findable-ui/lib/hooks/useEntityService";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { database } from "@databiosphere/findable-ui/lib/utils/database";
import { EntityDetailView } from "@databiosphere/findable-ui/lib/views/EntityDetailView/entityDetailView";
import { EntityExportView } from "@databiosphere/findable-ui/lib/views/EntityExportView/entityExportView";
import { EntityExportMethodView } from "@databiosphere/findable-ui/lib/views/EntityExportMethodView/entityExportMethodView";
import { config } from "app/config/config";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { EntityGuard } from "../../app/components/Detail/components/EntityGuard/entityGuard";
import { readFile } from "../../app/utils/tsvParser";
import { useRouter } from "next/router";

const setOfProcessedIds = new Set<string>();

interface StaticPath {
  params: PageUrl;
}

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
  const { query } = useRouter();
  if (!props.entityListType) return <></>;
  if (props.override) return <EntityGuard override={props.override} />;
  if (isChooseExportView(query)) return <EntityExportView {...props} />;
  if (isExportMethodView(query)) return <EntityExportMethodView {...props} />;
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
 * Check if the current view matches the expected export path segment.
 * @param query - The current query object.
 * @param expectedIndex - The expected index for the parameter length check.
 * @returns True if the view matches the expected export criteria.
 */
function isExportView(query: ParsedUrlQuery, expectedIndex: number): boolean {
  return (
    !!query.params &&
    query.params.length === expectedIndex + 1 &&
    query.params[PARAMS_INDEX_TAB] === "export"
  );
}

/**
 * Determine if the current view is choose export method.
 * @param query - The current query object.
 * @returns True if the current view is choose export.
 */
function isChooseExportView(query: ParsedUrlQuery): boolean {
  return isExportView(query, PARAMS_INDEX_TAB);
}

/**
 * Determine if the current view is an export method (e.g. file manifest or Terra).
 * @param query - The current query object.
 * @returns True if the current view is an export method.
 */
function isExportMethodView(query: ParsedUrlQuery): boolean {
  return isExportView(query, PARAMS_INDEX_EXPORT_METHOD);
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
  const { dataSource, entities } = appConfig;
  const { defaultParams } = dataSource;
  const { catalog: defaultCatalog } = defaultParams || {};

  const paths: StaticPath[] = [];

  for (const entityConfig of entities) {
    const { exploreMode, route: entityListType } = entityConfig;
    // Process static paths.
    if (entityConfig.detail.staticLoad) {
      // Client-side fetch, client-side filtering.
      if (exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING) {
        await seedDatabase(entityListType, entityConfig);
        const entitiesResponse = await getEntities(entityConfig);
        processEntityPaths(entityConfig, entitiesResponse, paths);
      }
      // Server-side fetch, server-side filtering.
      if (exploreMode === EXPLORE_MODE.SS_FETCH_SS_FILTERING) {
        // Fetch catalogs and generate a list of catalogs associated with the default catalog.
        const azulCatalogResponse = await fetchCatalog();
        const catalogs = getCatalogs(azulCatalogResponse, defaultCatalog);
        // Define the list params.
        const listParams = { size: "100" };
        // Fetch entities for each catalog and process the paths.
        for (const catalog of catalogs) {
          const entitiesResponse = await getEntities(
            entityConfig,
            catalog,
            listParams
          );
          processEntityPaths(entityConfig, entitiesResponse, paths);
        }
      }
    }
    // Process entity overrides.
    processEntityOverridePaths(entityConfig, paths);
  }

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<AzulEntityStaticResponse> = async ({
  params,
}: GetStaticPropsContext) => {
  const appConfig = config();
  const { entities } = appConfig;
  const entityListType = (params as PageUrl).entityListType;
  const slug = (params as PageUrl).params;
  const entityConfig = getEntityConfig(entities, entityListType);
  const entityTab = getSlugPath(slug, PARAMS_INDEX_TAB);
  const entityId = getSlugPath(slug, PARAMS_INDEX_UUID);

  if (!entityConfig || !entityId) return { notFound: true };

  const props: EntityDetailPageProps = { entityListType };

  // Process entity override props.
  processEntityOverrideProps(entityConfig, entityListType, entityId, props);
  // Early exit; return entity override props.
  if (props.override) return { props };

  // Process entity props.
  await processEntityProps(entityConfig, entityTab, entityId, props);

  return {
    props,
  };
};

export default EntityDetailPage;

/**
 * Returns the catalog prefix for the given default catalog.
 * @param defaultCatalog - Default catalog.
 * @returns catalog prefix.
 */
function getCatalogPrefix(defaultCatalog: string): string {
  //eslint-disable-next-line sonarjs/slow-regex -- catalog numbers should be short and are not user provided
  return defaultCatalog.replace(/\d.*$/, ""); //TODO - are all catalog numbers less than a maximum length? could remove eslint ignore
}

/**
 * Returns the catalogs associated with the default catalog.
 * @param catalogResponse - Catalog response.
 * @param defaultCatalog - Default catalog.
 * @returns catalogs.
 */
function getCatalogs(
  catalogResponse: AzulCatalogResponse,
  defaultCatalog?: string
): string[] {
  const catalogs: string[] = [];
  if (!defaultCatalog) return catalogs;
  const catalogPrefix = getCatalogPrefix(defaultCatalog);
  for (const [catalog, { internal }] of Object.entries(
    catalogResponse.catalogs
  )) {
    if (internal) continue;
    if (catalog.startsWith(catalogPrefix)) {
      catalogs.push(catalog);
    }
  }
  return catalogs;
}

/**
 * Fetches entities response for the given entity config.
 * @param entityConfig - Entity config.
 * @param catalog - Catalog.
 * @param listParams - List params.
 * @returns entities response.
 */
async function getEntities(
  entityConfig: EntityConfig,
  catalog?: string,
  listParams?: AzulListParams
): Promise<AzulEntitiesResponse> {
  const { fetchAllEntities, path } = getEntityService(entityConfig, catalog);
  return await fetchAllEntities(path, undefined, catalog, listParams);
}

/**
 * Fetches the entity for the given entity ID.
 * @param entityConfig - Entity config.
 * @param entityId - Entity ID.
 * @returns entity response.
 */
async function getEntity(
  entityConfig: EntityConfig,
  entityId: string
): Promise<AzulEntityStaticResponse> {
  const { fetchEntityDetail, path } = getEntityService(entityConfig, undefined);
  return await fetchEntityDetail(
    entityId,
    path,
    undefined,
    undefined,
    undefined,
    true
  );
}

/**
 * Returns the slug path for the given slug and slug index.
 * @param slug - Slug.
 * @param slugIndex - Slug index.
 * @returns path.
 */
function getSlugPath(slug: string[], slugIndex: number): string | undefined {
  return slug[slugIndex];
}

/**
 * Returns the list of tab routes for the given tab config.
 * @param tabs - Tab config.
 * @returns tab routes.
 */
function getTabRoutes(tabs: BackPageTabConfig[]): string[] {
  return tabs.map(({ route }) => route) ?? [];
}

/**
 * Processes the static paths for entity overrides.
 * @param entityConfig - Entity config.
 * @param paths - Static paths.
 */
function processEntityOverridePaths(
  entityConfig: EntityConfig,
  paths: StaticPath[]
): void {
  const { overrides, route: entityListType } = entityConfig;
  if (!overrides) return;
  for (const override of overrides) {
    if (isOverride(override)) {
      paths.push({
        params: {
          entityListType,
          params: [override.entryId],
        },
      });
    }
  }
}

/**
 * Processes the override props for the given entity page.
 * @param entityConfig - Entity config.
 * @param entityListType - Entity list type.
 * @param entityId - Entity ID.
 * @param props - Entity detail page props.
 */
function processEntityOverrideProps(
  entityConfig: EntityConfig,
  entityListType: string,
  entityId: string,
  props: EntityDetailPageProps
): void {
  const { overrides } = entityConfig;
  if (!overrides) return;
  const override = findOverride(overrides, entityId);
  if (override && isOverride(override)) {
    props.override = { ...override };
    if (override.duplicateOf) {
      props.override.duplicateOf = `/${entityListType}/${override.duplicateOf}`;
    }
  }
}

/**
 * Processes the static paths for the given entity response.
 * @param entityConfig - Entity config.
 * @param entitiesResponse - Entities response.
 * @param paths - Static paths.
 */
function processEntityPaths(
  entityConfig: EntityConfig,
  entitiesResponse: AzulEntitiesResponse,
  paths: StaticPath[]
): void {
  const { detail, export: exportConfig, route: entityListType } = entityConfig;
  const { tabs } = detail;
  const { hits: entities } = entitiesResponse;
  const tabRoutes = getTabRoutes(tabs);
  for (const entity of entities) {
    const entityId = entityConfig.getId?.(entity);
    if (!entityId) continue;
    // Skip the entity if it has already been processed.
    if (setOfProcessedIds.has(entityId)) continue;
    setOfProcessedIds.add(entityId);
    // Generate a path for each entity and each tab.
    for (const tabRoute of tabRoutes) {
      const params = [entityId, tabRoute];
      paths.push({
        params: {
          entityListType,
          params,
        },
      });
    }
    // Generate paths for exports: add paths for choose method and each individual
    // export method.
    if (!exportConfig) continue;
    for (const exportRoute of [
      ...exportConfig.tabs,
      ...exportConfig.exportMethods,
    ]) {
      // Split export routes into individual paths (e.g. /export/download-manifest),
      // removing any slashes. Default to empty array if no route is provided.
      const exportRoutePaths =
        exportRoute?.route?.split("/").filter(Boolean) || [];
      // Build and add paths for each export route.
      const params = [entityId, ...exportRoutePaths];
      paths.push({
        params: {
          entityListType,
          params,
        },
      });
    }
  }
}

/**
 * Processes the entity props for the given entity page.
 * @param entityConfig - Entity config.
 * @param entityTab - Entity tab.
 * @param entityId - Entity ID.
 * @param props - Entity detail page props.
 */
async function processEntityProps(
  entityConfig: EntityConfig,
  entityTab = "",
  entityId: string,
  props: EntityDetailPageProps
): Promise<void> {
  const {
    detail: { staticLoad },
    exploreMode,
  } = entityConfig;
  // Early exit; return if the entity is not to be statically loaded.
  if (!staticLoad) return;
  // When the entity detail is to be fetched from API, we only do so for the first tab.
  if (exploreMode === EXPLORE_MODE.SS_FETCH_SS_FILTERING && entityTab) return;
  if (exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING) {
    // Seed database.
    await seedDatabase(entityConfig.route, entityConfig);
  }
  // Fetch entity detail, either from database or API.
  const entityResponse = await getEntity(entityConfig, entityId);
  if (entityResponse) {
    props.data = entityResponse;
  }
}

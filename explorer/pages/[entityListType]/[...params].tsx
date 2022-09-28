import { config, getEntityConfig } from "app/config/config";
import { getEntityService } from "app/hooks/useEntityService";
import { PARAMS_INDEX_UUID } from "app/shared/constants";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { AzulEntityStaticResponse } from "../../app/apis/azul/common/entities";
import { Page } from "../../app/components/Layout/components/Page/page";
import { EntityDetailView } from "../../app/views/EntityDetailView/entityDetailView";

interface PageUrl extends ParsedUrlQuery {
  entityListType: string;
  params: string[];
}

interface EntityDetailPageProps extends AzulEntityStaticResponse {
  entityListType: string;
}

/**
 * Entity detail component
 * @param projectPageProps - d
 * @param projectPageProps.entityListType - d
 * @param projectPageProps.props - d
 * @constructor
 */
const EntityDetailPage = ({
  entityListType,
  ...props
}: EntityDetailPageProps): JSX.Element => {
  if (!entityListType) return <></>;

  const entityConfig = getEntityConfig(entityListType);

  return (
    <Page entity={entityConfig}>
      <EntityDetailView {...props} />
    </Page>
  );
};

/**
 * getStaticPaths - return the list of paths to prerender for each entity type and its tabs.
 */
export const getStaticPaths: GetStaticPaths<PageUrl> = async () => {
  const entities = config().entities;
  const paths = await Promise.all(
    entities.map(async (entityConfig) => {
      const resultParams: { params: PageUrl }[] = [];
      if (entityConfig.detail.staticLoad && entityConfig.getId) {
        const { fetchAllEntities, path } = getEntityService(entityConfig);
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
  const { entityListType } = params as PageUrl;
  const entity = getEntityConfig(entityListType);

  if (!entity) {
    return {
      notFound: true,
    };
  }

  const props: EntityDetailPageProps = { entityListType: entityListType };
  if (entity.detail.staticLoad) {
    const { fetchEntityDetail, path } = getEntityService(entity);
    const data = await fetchEntityDetail(
      (params as PageUrl).params[PARAMS_INDEX_UUID],
      path
    );
    props.data = data;
  }
  return {
    props,
  };
};

export default EntityDetailPage;

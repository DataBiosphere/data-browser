import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { Detail as DetailView } from "app/components/Detail/detail";
import { useCurrentDetailTab } from "app/hooks/useCurrentDetailTab";
import { useFetchEntity } from "app/hooks/useFetchEntity";
import { PARAMS_INDEX_UUID } from "app/shared/constants";
import { useRouter } from "next/router";
import React from "react";
import { EntityDetailPageProps } from "../../../pages/[entityListType]/[...params]";
import { Tab, Tabs, TabValue } from "../../components/common/Tabs/tabs";
import { EntityConfig } from "../../config/common/entities";
import { getEntityConfig } from "../../config/config";

/**
 * Returns tabs to be used as a prop for the Tabs component.
 * @param entity - Entity config related to the /explore/projects route.
 * @returns tabs list.
 */
function getTabs(entity: EntityConfig): Tab[] {
  return entity.detail.tabs.map(({ label, route }) => ({
    label,
    value: route,
  }));
}

export const EntityDetailView = (props: EntityDetailPageProps): JSX.Element => {
  const { currentTab, route: tabRoute } = useCurrentDetailTab(
    props.entityListType
  );
  const { mainColumn, sideColumn } = currentTab;
  const { isLoading, response } = useFetchEntity(props);
  const { push, query } = useRouter();
  const currentEntityConfig = getEntityConfig(props.entityListType);
  const { detail, route: entityRoute } = currentEntityConfig;
  const { detailOverviews, top } = detail;
  const uuid = query.params?.[PARAMS_INDEX_UUID];
  const isDetailOverview = detailOverviews?.includes(currentTab.label);
  const tabs = getTabs(currentEntityConfig);

  if (isLoading) {
    return <span></span>; //TODO: return the loading UI component
  }

  /**
   * Callback fired when selected tab value changes.
   * - Executes a pushState.
   * @param tabValue - Selected tab value.
   */
  const onTabChange = (tabValue: TabValue): void => {
    push(`/${entityRoute}/${uuid}/${tabValue}`);
  };

  return (
    <DetailView
      isDetailOverview={isDetailOverview}
      mainColumn={
        <ComponentCreator components={mainColumn} response={response} />
      }
      sideColumn={
        sideColumn ? (
          <ComponentCreator components={sideColumn} response={response} />
        ) : undefined
      }
      Tabs={<Tabs onTabChange={onTabChange} tabs={tabs} value={tabRoute} />}
      top={<ComponentCreator components={top} response={response} />}
    />
  );
};

// Core dependencies
import { useRouter } from "next/router";
import React, { useState } from "react";

// App dependencies
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { Project as ProjectView } from "app/components/Project/project";
import { useCurrentDetailTab } from "app/hooks/useCurrentDetailTab";
import { useCurrentEntity } from "app/hooks/useCurrentEntity";
import { useFetchEntity } from "app/hooks/useFetchEntity";
import { PARAMS_INDEX_UUID } from "app/shared/constants";
import {
  Tab,
  Tabs,
  TabsValue,
  TabValue,
} from "../../components/common/Tabs/tabs";
import { EntityConfig } from "../../config/model";
import { DetailModel } from "../../models/viewModels";

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

export const Project = (props: DetailModel): JSX.Element => {
  const { currentTab, route: tabRoute } = useCurrentDetailTab();
  const entity = useCurrentEntity();
  const { response, isLoading } = useFetchEntity(props);
  const [tabsValue, setTabsValue] = useState<TabsValue>(tabRoute);
  const { push, query } = useRouter();
  const entityRoute = entity.route;
  const uuid = query.params?.[PARAMS_INDEX_UUID];
  const mainColumn = currentTab.mainColumn;
  const sideColumn = currentTab.sideColumn;
  const tabs = getTabs(entity);
  const top = entity.detail.top;

  if (isLoading) {
    return <span></span>; //TODO: return the loading UI component
  }

  /**
   * Callback fired when selected tab value changes.
   * - Sets state tabsValue to selected tab value.
   * - Executes a pushState.
   * @param tabValue - Selected tab value.
   */
  const onTabChange = (tabValue: TabValue): void => {
    setTabsValue(tabValue); // Set state tabsValue prior to route change to indicate selection success.
    push(`/${entityRoute}/${uuid}/${tabValue}`);
  };

  return (
    <ProjectView
      mainColumn={
        <ComponentCreator components={mainColumn} response={response} />
      }
      sideColumn={
        <ComponentCreator components={sideColumn} response={response} />
      }
      Tabs={<Tabs onTabChange={onTabChange} tabs={tabs} value={tabsValue} />}
      top={<ComponentCreator components={top} response={response} />}
    />
  );
};

import {
  BackPageTabConfig,
  ComponentConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { PROJECT_ENTITY_ROUTE } from "../../../dev/index/projectsEntityConfig";

const MAIN_COLUMN_WARNING: ComponentConfig[] = [
  {
    /* Project is not accessible; render warning */
    children: [
      {
        children: [
          {
            component: C.FluidAlert,
            viewBuilder: V.buildExportEntityWarning,
          } as ComponentConfig<typeof C.FluidAlert, ProjectsResponse>,
        ],
        component: C.BackPageContentSingleColumn,
      } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderExportEntityWarning,
  } as ComponentConfig<typeof C.ConditionalComponent, ProjectsResponse>,
];

/**
 * Returns managed access project detail tabs.
 * @param tabs - Tabs config.
 * @returns managed access project detail tabs.
 */
export function getMAProjectDetailTabs(
  tabs: BackPageTabConfig[]
): BackPageTabConfig[] {
  return [...tabs].map((tab) => {
    if (
      tab.route === PROJECT_ENTITY_ROUTE.OVERVIEW ||
      tab.route === PROJECT_ENTITY_ROUTE.PROJECT_MATRICES
    ) {
      return tab;
    }
    const cloneTab = { ...tab };
    cloneTab.mainColumn = getMADetailMainColumn(tab);
    cloneTab.sideColumn = undefined;
    return cloneTab;
  });
}

/**
 * Returns the managed access detail main column components.
 * @param tab - Tab config.
 * @returns managed access detail main column components.
 */
function getMADetailMainColumn(tab: BackPageTabConfig): ComponentConfig[] {
  return [
    /* Project is not accessible; render warning */
    ...MAIN_COLUMN_WARNING,
    /* Project is accessible; render export entity */
    {
      children: [
        /* mainColumn */
        {
          children: [...(tab.mainColumn as ComponentConfig[])],
          component: C.BackPageContentMainColumn,
        } as ComponentConfig<typeof C.BackPageContentMainColumn>,
        /* sideColumn */
        {
          children: [...(tab.sideColumn as ComponentConfig[])],
          component: C.BackPageContentSideColumn,
        } as ComponentConfig<typeof C.BackPageContentSideColumn>,
      ],
      component: C.ConditionalComponent,
      viewBuilder: V.renderExportEntity,
    } as ComponentConfig<typeof C.ConditionalComponent, ProjectsResponse>,
  ];
}

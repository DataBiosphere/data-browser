import {
  BackPageTabConfig,
  ComponentConfig,
  ExportConfig,
  ExportMethodConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/hca-dcp";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

const MAIN_COLUMN_WARNING = [
  /* mainColumn - top section - warning */
  {
    children: [
      {
        component: MDX.AlertExportWarning,
        viewBuilder: V.buildAlertExportWarning,
      } as ComponentConfig<typeof MDX.AlertExportWarning>,
    ],
    component: C.BackPageContentSingleColumn,
  } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
];

/**
 * Returns the managed access export config.
 * @param exportConfig - Export config.
 * @returns managed access export config.
 */
export function getMAExportConfig(exportConfig: ExportConfig): ExportConfig {
  // Clone export config.
  const cloneExportConfig = { ...exportConfig };
  // Update export methods.
  cloneExportConfig.exportMethods = getMAExportMethods(exportConfig);
  // Update tabs.
  cloneExportConfig.tabs = getMAExportTabs(exportConfig.tabs);
  return cloneExportConfig;
}

/**
 * Returns the managed access export method main column.
 * @param exportConfig - Export config.
 * @param exportMethod - Export method config.
 * @returns managed access export method main column.
 */
function getMAExportMethodMainColumn(
  exportConfig: ExportConfig,
  exportMethod: ExportMethodConfig
): ComponentConfig[] {
  return [
    /* mainColumn - top section - warning - some datasets are not available */
    ...MAIN_COLUMN_WARNING,
    /* mainColumn */
    {
      children: [...(exportMethod.mainColumn as ComponentConfig[])],
      component: C.BackPageContentMainColumn,
    } as ComponentConfig<typeof C.BackPageContentMainColumn>,
    /* sideColumn */
    {
      children: [...(exportConfig.tabs[0].sideColumn as ComponentConfig[])],
      component: C.BackPageContentSideColumn,
    } as ComponentConfig<typeof C.BackPageContentSideColumn>,
  ];
}

/**
 * Returns the managed access export methods.
 * @param exportConfig - Export config.
 * @returns managed access export methods.
 */
function getMAExportMethods(exportConfig: ExportConfig): ExportMethodConfig[] {
  // Return managed access export methods.
  return [...exportConfig.exportMethods].map((exportMethod) => {
    const cloneExportMethod = { ...exportMethod };
    cloneExportMethod.mainColumn = getMAExportMethodMainColumn(
      exportConfig,
      exportMethod
    );
    return cloneExportMethod;
  });
}

/**
 * Returns the managed access export tab.
 * @param tab - Tab config.
 * @returns managed access export tab.
 */
function getMAExportTab(tab: BackPageTabConfig): ComponentConfig[] {
  return [
    /* mainColumn - top section - warning - some datasets are not available */
    ...MAIN_COLUMN_WARNING,
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
  ];
}

/**
 * Returns the managed access export tabs.
 * @param tabs - Export tabs.
 * @returns managed access export tabs.
 */
function getMAExportTabs(tabs: BackPageTabConfig[]): BackPageTabConfig[] {
  return [...tabs].map((tab) => {
    const cloneTab = { ...tab };
    // Update tab main column.
    cloneTab.mainColumn = getMAExportTab(tab);
    // Remove side column from tab.
    cloneTab.sideColumn = undefined;
    return cloneTab;
  });
}

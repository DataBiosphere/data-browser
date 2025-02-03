import {
  ComponentConfig,
  ExportConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { sideColumn as exportSideColumn } from "../../../export/exportSideColumn";
import * as V from "../../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import * as C from "../../../../../../app/components";
import { DatasetsResponse } from "app/apis/azul/anvil-cmg/common/responses";
import {
  ROUTE_EXPORT_TO_TERRA,
  ROUTE_MANIFEST_DOWNLOAD,
} from "../../../export/constants";
import * as MDX from "../../../../../../app/components/common/MDXContent/anvil-cmg";

/**
 * Badge indicating dataset accessibility.
 */
const DATASET_ACCESSIBILITY_BADGE = {
  component: C.AccessibilityBadge,
  viewBuilder: V.buildDatasetAccessibilityBadge,
} as ComponentConfig<typeof C.AccessibilityBadge>;

/**
 * Dataset export configuration.
 */
export const exportConfig: ExportConfig = {
  exportMethods: [
    {
      mainColumn: [
        /* --------- */
        /* Dataset is not accessible; render warning */
        /* --------- */
        {
          children: [
            {
              children: [
                {
                  component: MDX.Alert,
                  viewBuilder: V.buildAlertDatasetTerraExportWarning,
                } as ComponentConfig<typeof MDX.Alert, DatasetsResponse>,
              ],
              component: C.BackPageContentSingleColumn,
            } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
          ],
          component: C.ConditionalComponent,
          viewBuilder: V.renderDatasetTerraExportWarning,
        } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
        /* ------ */
        /* Dataset is accessible; render Terra export method */
        /* ------ */
        {
          children: [
            {
              children: [
                {
                  component: C.ExportToTerra,
                  viewBuilder: V.buildExportToTerra,
                } as ComponentConfig<typeof C.ExportToTerra>,
              ],
              component: C.BackPageContentMainColumn,
            } as ComponentConfig<typeof C.BackPageContentMainColumn>,
            /* sideColumn */
            ...exportSideColumn,
          ],
          component: C.ConditionalComponent,
          viewBuilder: V.renderDatasetTerraExport,
        } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
      ],
      route: ROUTE_EXPORT_TO_TERRA,
      top: [
        {
          children: [DATASET_ACCESSIBILITY_BADGE],
          component: C.BackPageHero,
          viewBuilder: V.buildDatasetExportMethodHeroTerraExport,
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
    {
      mainColumn: [
        /* --------- */
        /* Dataset is not accessible; render warning */
        /* --------- */
        {
          children: [
            {
              children: [
                {
                  component: MDX.Alert,
                  viewBuilder: V.buildAlertDatasetManifestDownloadWarning,
                } as ComponentConfig<typeof MDX.Alert, DatasetsResponse>,
              ],
              component: C.BackPageContentSingleColumn,
            } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
          ],
          component: C.ConditionalComponent,
          viewBuilder: V.renderDatasetExportWarning,
        } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
        /* ------ */
        /* Dataset is accessible; render file manifest method */
        /* ------ */
        {
          children: [
            {
              children: [
                {
                  component: C.AnVILManifestDownloadEntity,
                  viewBuilder: V.buildManifestDownloadEntity,
                } as ComponentConfig<
                  typeof C.AnVILManifestDownloadEntity,
                  DatasetsResponse
                >,
              ],
              component: C.BackPageContentMainColumn,
            } as ComponentConfig<typeof C.BackPageContentMainColumn>,
            /* sideColumn */
            ...exportSideColumn,
          ],
          component: C.ConditionalComponent,
          viewBuilder: V.renderDatasetExport,
        } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
      ],
      route: ROUTE_MANIFEST_DOWNLOAD,
      top: [
        {
          children: [DATASET_ACCESSIBILITY_BADGE],
          component: C.BackPageHero,
          viewBuilder: V.buildDatasetExportMethodHeroManifestDownload,
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
  ],
  staticLoad: true, // TODO this matches the cohort export config, but is it necessary?
  tabs: [
    {
      label: "Choose Export Method",
      mainColumn: [
        /* --------- */
        /* Dataset is not accessible; render warning */
        /* --------- */
        {
          children: [
            {
              children: [
                {
                  component: MDX.Alert,
                  // TODO(cc) update text
                  viewBuilder: V.buildAlertDatasetExportWarning,
                } as ComponentConfig<typeof MDX.Alert, DatasetsResponse>,
              ],
              component: C.BackPageContentSingleColumn,
            } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
          ],
          component: C.ConditionalComponent,
          viewBuilder: V.renderDatasetExportWarning,
        } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
        /* ------ */
        /* Dataset is accessible; render export entity */
        /* ------ */
        {
          children: [
            {
              children: [
                {
                  component: C.ExportMethod,
                  viewBuilder: V.buildDatasetExportMethodTerra,
                } as ComponentConfig<typeof C.ExportMethod>,
                {
                  component: C.ExportMethod,
                  viewBuilder: V.buildDatasetExportMethodManifestDownload,
                } as ComponentConfig<typeof C.ExportMethod>,
              ],
              component: C.BackPageContentMainColumn,
            } as ComponentConfig<typeof C.BackPageContentMainColumn>,
            /* sideColumn */
            ...exportSideColumn,
          ],
          component: C.ConditionalComponent,
          viewBuilder: V.renderDatasetExport,
        } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
      ],
      route: "/export",
    },
  ],
  top: [
    {
      children: [DATASET_ACCESSIBILITY_BADGE],
      component: C.BackPageHero,
      viewBuilder: V.buildDatasetExportHero,
    } as ComponentConfig<typeof C.BackPageHero, DatasetsResponse>,
  ],
};

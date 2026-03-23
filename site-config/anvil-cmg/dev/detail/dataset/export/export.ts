import {
  ComponentConfig,
  ExportConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { sideColumn as exportSideColumn } from "../../../export/exportSideColumn";
import * as V from "../../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import * as C from "../../../../../../app/components";
import { DatasetsResponse } from "app/apis/azul/anvil-cmg/common/responses";
import { ROUTES } from "../../../export/routes";
import * as MDX from "../../../../../../app/components/common/MDXContent/anvil-cmg";
import { ExportMethod } from "../../../../../../app/components/Export/components/AnVILExplorer/platform/ExportMethod/exportMethod";
import { EXPORT_METHODS, EXPORTS } from "../../../export/constants";
import { ExportToPlatform } from "../../../../../../app/components/Export/components/AnVILExplorer/platform/ExportToPlatform/exportToPlatform";

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
        /* Dataset is accessible; render Terra export method */
        /* ------ */
        {
          children: [
            {
              children: [
                {
                  component: C.ExportToTerra,
                  viewBuilder: V.buildDatasetTerraExport,
                } as ComponentConfig<typeof C.ExportToTerra>,
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
      route: ROUTES.TERRA,
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
        /* Dataset is accessible; render BioData Catalyst export method */
        /* ------ */
        {
          children: [
            {
              children: [
                {
                  component: ExportToPlatform,
                  viewBuilder: V.buildDatasetExportToPlatform(
                    EXPORTS.BIO_DATA_CATALYST
                  ),
                } as ComponentConfig<typeof ExportToPlatform>,
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
      route: ROUTES.BIO_DATA_CATALYST,
      top: [
        {
          children: [DATASET_ACCESSIBILITY_BADGE],
          component: C.BackPageHero,
          viewBuilder: V.buildDatasetExportToPlatformHero(
            EXPORTS.BIO_DATA_CATALYST.title
          ),
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
        /* Dataset is accessible; render CAVATICA export method */
        /* ------ */
        {
          children: [
            {
              children: [
                {
                  component: ExportToPlatform,
                  viewBuilder: V.buildDatasetExportToPlatform(EXPORTS.CAVATICA),
                } as ComponentConfig<typeof ExportToPlatform>,
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
      route: ROUTES.CAVATICA,
      top: [
        {
          children: [DATASET_ACCESSIBILITY_BADGE],
          component: C.BackPageHero,
          viewBuilder: V.buildDatasetExportToPlatformHero(
            EXPORTS.CAVATICA.title
          ),
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
        /* Dataset is accessible; render Cancer Genomics Cloud export method */
        /* ------ */
        {
          children: [
            {
              children: [
                {
                  component: ExportToPlatform,
                  viewBuilder: V.buildDatasetExportToPlatform(
                    EXPORTS.CANCER_GENOMICS_CLOUD
                  ),
                } as ComponentConfig<typeof ExportToPlatform>,
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
      route: ROUTES.CANCER_GENOMICS_CLOUD,
      top: [
        {
          children: [DATASET_ACCESSIBILITY_BADGE],
          component: C.BackPageHero,
          viewBuilder: V.buildDatasetExportToPlatformHero(
            EXPORTS.CANCER_GENOMICS_CLOUD.title
          ),
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
                  viewBuilder: V.buildDatasetExportPropsWithFilter,
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
      route: ROUTES.MANIFEST_DOWNLOAD,
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
                // Empty component for triggering calls to populate the selected data in the side channel.
                {
                  component: C.AnVILExportEntity,
                  viewBuilder: V.buildDatasetExportPropsWithFilter,
                } as ComponentConfig<typeof C.AnVILExportEntity>,
                {
                  component: C.ExportMethod,
                  viewBuilder: V.buildDatasetExportMethodTerra,
                } as ComponentConfig<typeof C.ExportMethod>,
                {
                  component: ExportMethod,
                  viewBuilder: V.buildDatasetExportToPlatformMethod(
                    EXPORT_METHODS.BIO_DATA_CATALYST
                  ),
                } as ComponentConfig<typeof ExportMethod>,
                {
                  component: ExportMethod,
                  viewBuilder: V.buildDatasetExportToPlatformMethod(
                    EXPORT_METHODS.CAVATICA
                  ),
                } as ComponentConfig<typeof ExportMethod>,
                {
                  component: ExportMethod,
                  viewBuilder: V.buildDatasetExportToPlatformMethod(
                    EXPORT_METHODS.CANCER_GENOMICS_CLOUD
                  ),
                } as ComponentConfig<typeof ExportMethod>,
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

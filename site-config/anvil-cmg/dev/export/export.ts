import {
  ComponentConfig,
  ExportConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { ROUTES } from "./routes";
import { mainColumn as exportMainColumn } from "./exportMainColumn";
import { sideColumn as exportSideColumn } from "./exportSideColumn";
import { ExportMethod } from "../../../../app/components/Export/components/AnVILExplorer/platform/ExportMethod/exportMethod";
import { EXPORT_METHODS, EXPORTS } from "./constants";

export const exportConfig: ExportConfig = {
  exportMethods: [
    {
      mainColumn: [
        /* mainColumn - top section - warning - some datasets are not available */
        ...exportMainColumn,
        /* mainColumn */
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
      route: ROUTES.TERRA,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: V.buildExportMethodHeroTerra,
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
    {
      mainColumn: [
        /* mainColumn - top section - warning - some datasets are not available */
        ...exportMainColumn,
        /* mainColumn */
        {
          children: [
            {
              component: C.ExportToPlatform,
              viewBuilder: V.buildExportToPlatform(EXPORTS.BIO_DATA_CATALYST),
            } as ComponentConfig<typeof C.ExportToPlatform>,
          ],
          component: C.BackPageContentMainColumn,
        } as ComponentConfig<typeof C.BackPageContentMainColumn>,
        /* sideColumn */
        ...exportSideColumn,
      ],
      route: ROUTES.BIO_DATA_CATALYST,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: V.buildExportToPlatformHero(
            "Export to BioData Catalyst"
          ),
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
    {
      mainColumn: [
        /* mainColumn - top section - warning - some datasets are not available */
        ...exportMainColumn,
        /* mainColumn */
        {
          children: [
            {
              component: C.ExportToPlatform,
              viewBuilder: V.buildExportToPlatform(EXPORTS.CAVATICA),
            } as ComponentConfig<typeof C.ExportToPlatform>,
          ],
          component: C.BackPageContentMainColumn,
        } as ComponentConfig<typeof C.BackPageContentMainColumn>,
        /* sideColumn */
        ...exportSideColumn,
      ],
      route: ROUTES.CAVATICA,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: V.buildExportToPlatformHero("Export to CAVATICA"),
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
    {
      mainColumn: [
        /* mainColumn - top section - warning - some datasets are not available */
        ...exportMainColumn,
        /* mainColumn */
        {
          children: [
            {
              component: C.ManifestDownload,
              viewBuilder: V.buildManifestDownload,
            } as ComponentConfig<typeof C.ManifestDownload>,
          ],
          component: C.BackPageContentMainColumn,
        } as ComponentConfig<typeof C.BackPageContentMainColumn>,
        /* sideColumn */
        ...exportSideColumn,
      ],
      route: ROUTES.MANIFEST_DOWNLOAD,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: V.buildExportMethodHeroManifestDownload,
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
  ],
  staticLoad: true, //TODO is this correct?
  tabs: [
    {
      label: "Choose Export Method",
      mainColumn: [
        /* mainColumn - top section - warning - some datasets are not available */
        ...exportMainColumn,
        /* mainColumn */
        {
          children: [
            {
              component: C.ExportMethod,
              viewBuilder: V.buildExportMethodTerra,
            } as ComponentConfig<typeof C.ExportMethod>,
            {
              component: ExportMethod,
              viewBuilder: V.buildExportToPlatformMethod(
                EXPORT_METHODS.BIO_DATA_CATALYST
              ),
            } as ComponentConfig<typeof ExportMethod>,
            {
              component: ExportMethod,
              viewBuilder: V.buildExportToPlatformMethod(
                EXPORT_METHODS.CAVATICA
              ),
            } as ComponentConfig<typeof ExportMethod>,
            {
              component: C.ExportMethod,
              viewBuilder: V.buildExportMethodManifestDownload,
            } as ComponentConfig<typeof C.ExportMethod>,
          ],
          component: C.BackPageContentMainColumn,
        } as ComponentConfig<typeof C.BackPageContentMainColumn>,
        /* sideColumn */
        ...exportSideColumn,
      ],
      route: "/export",
    },
  ],
  top: [
    {
      component: C.BackPageHero,
      viewBuilder: V.buildExportHero,
    } as ComponentConfig<typeof C.BackPageHero>,
  ],
};

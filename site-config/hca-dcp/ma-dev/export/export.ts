import {
  ComponentConfig,
  ExportConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { EXPORT_ACCESS_WARNING } from "./accessWarning";
import { getExportMethodMainColumn } from "./exportMethodMainColumn";
import { EXPORT_ROUTE } from "./routes";
import {
  getExportCurrentQueryAndDataSummary,
  getExportDataReleasePolicy,
} from "./sideColumn";

export const EXPORT: ExportConfig = {
  exportMethods: [
    {
      mainColumn: getExportMethodMainColumn([
        {
          component: C.DownloadCurlCommand,
          viewBuilder: V.buildDownloadCurlCommand,
        } as ComponentConfig<typeof C.DownloadCurlCommand>,
      ]),
      route: EXPORT_ROUTE.BULK_DOWNLOAD,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: V.buildExportMethodHeroCurlCommand,
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
    {
      mainColumn: getExportMethodMainColumn([
        {
          component: C.ManifestDownload,
          viewBuilder: V.buildManifestDownload,
        } as ComponentConfig<typeof C.ManifestDownload>,
      ]),
      route: EXPORT_ROUTE.MANIFEST_DOWNLOAD,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: V.buildExportMethodHeroManifestDownload,
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
    {
      mainColumn: getExportMethodMainColumn([
        {
          component: C.ExportToTerra,
          viewBuilder: V.buildExportToTerra,
        } as ComponentConfig<typeof C.ExportToTerra>,
      ]),
      route: EXPORT_ROUTE.EXPORT_TO_TERRA,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: V.buildExportMethodHeroTerra,
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
  ],
  staticLoad: true,
  tabs: [
    {
      label: "Choose Export Method",
      mainColumn: [
        EXPORT_ACCESS_WARNING,
        {
          children: [
            {
              component: C.ExportMethod,
              viewBuilder: V.buildExportMethodBulkDownload,
            } as ComponentConfig<typeof C.ExportMethod>,
            {
              component: C.ExportMethod,
              viewBuilder: V.buildExportMethodManifestDownload,
            } as ComponentConfig<typeof C.ExportMethod>,
            {
              component: C.ExportMethod,
              viewBuilder: V.buildExportMethodTerra,
            } as ComponentConfig<typeof C.ExportMethod>,
          ],
          component: C.BackPageContentMainColumn,
        } as ComponentConfig<typeof C.BackPageContentMainColumn>,
        {
          children: [
            ...getExportCurrentQueryAndDataSummary(),
            ...getExportDataReleasePolicy(),
          ],
          component: C.BackPageContentSideColumn,
        } as ComponentConfig<typeof C.BackPageContentSideColumn>,
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

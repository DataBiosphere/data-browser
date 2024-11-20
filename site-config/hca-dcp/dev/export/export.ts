import {
  ComponentConfig,
  ExportConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import {
  ROUTE_BULK_DOWNLOAD,
  ROUTE_EXPORT_TO_TERRA,
  ROUTE_MANIFEST_DOWNLOAD,
} from "./constants";
import {
  getExportCurrentQueryAndDataSummary,
  getExportDataReleasePolicy,
} from "./sideColumn";

export const exportConfig: ExportConfig = {
  exportMethods: [
    {
      mainColumn: [
        {
          component: C.DownloadCurlCommand,
          viewBuilder: V.buildDownloadCurlCommand,
        } as ComponentConfig<typeof C.DownloadCurlCommand>,
      ],
      route: ROUTE_BULK_DOWNLOAD,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: V.buildExportMethodHeroCurlCommand,
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
    {
      mainColumn: [
        {
          component: C.ManifestDownload,
          viewBuilder: V.buildManifestDownload,
        } as ComponentConfig<typeof C.ManifestDownload>,
      ],
      route: ROUTE_MANIFEST_DOWNLOAD,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: V.buildExportMethodHeroManifestDownload,
        } as ComponentConfig<typeof C.BackPageHero>,
      ],
    },
    {
      mainColumn: [
        {
          component: C.ExportToTerra,
          viewBuilder: V.buildExportToTerra,
        } as ComponentConfig<typeof C.ExportToTerra>,
      ],
      route: ROUTE_EXPORT_TO_TERRA,
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
      route: "/export",
      sideColumn: [
        ...getExportCurrentQueryAndDataSummary(),
        ...getExportDataReleasePolicy(),
      ],
    },
  ],
  top: [
    {
      component: C.BackPageHero,
      viewBuilder: V.buildExportHero,
    } as ComponentConfig<typeof C.BackPageHero>,
  ],
};

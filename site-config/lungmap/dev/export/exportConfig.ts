import {
  ComponentConfig,
  ExportConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as HCAViewModelBuilders from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import * as V from "../../../../app/viewModelBuilders/azul/lungmap/common/viewModelBuilders";
import { EXPORT_ROUTE } from "../../../hca-dcp/ma-dev/export/routes";
import { getExportCurrentQueryAndDataSummary } from "../../../hca-dcp/ma-dev/export/sideColumn";
import { getExportDataReleasePolicy } from "./sideColumn";

export const exportConfig: ExportConfig = {
  exportMethods: [
    {
      mainColumn: [
        {
          component: C.DownloadCurlCommand,
          viewBuilder: V.buildDownloadCurlCommand,
        } as ComponentConfig<typeof C.DownloadCurlCommand>,
      ],
      route: EXPORT_ROUTE.BULK_DOWNLOAD,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: HCAViewModelBuilders.buildExportMethodHeroCurlCommand,
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
      route: EXPORT_ROUTE.MANIFEST_DOWNLOAD,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder:
            HCAViewModelBuilders.buildExportMethodHeroManifestDownload,
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
      route: EXPORT_ROUTE.EXPORT_TO_TERRA,
      top: [
        {
          component: C.BackPageHero,
          viewBuilder: HCAViewModelBuilders.buildExportMethodHeroTerra,
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
          viewBuilder: HCAViewModelBuilders.buildExportMethodBulkDownload,
        } as ComponentConfig<typeof C.ExportMethod>,
        {
          component: C.ExportMethod,
          viewBuilder: HCAViewModelBuilders.buildExportMethodManifestDownload,
        } as ComponentConfig<typeof C.ExportMethod>,
        {
          component: C.ExportMethod,
          viewBuilder: HCAViewModelBuilders.buildExportMethodTerra,
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
      viewBuilder: HCAViewModelBuilders.buildExportHero,
    } as ComponentConfig<typeof C.BackPageHero>,
  ],
};

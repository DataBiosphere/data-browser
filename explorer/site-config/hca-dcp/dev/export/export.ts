import {
  ComponentConfig,
  ExportConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";
import * as MDX from "../../../../app/content/hca-dcp";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { ROUTE_BULK_DOWNLOAD, ROUTE_EXPORT_TO_TERRA } from "./constants";

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
          children: [
            {
              component: C.ExportMethod,
              viewBuilder: V.buildExportMethodBulkDownload,
            } as ComponentConfig<typeof C.ExportMethod>,
            {
              component: C.ExportMethod,
              viewBuilder: V.buildExportMethodTerra,
            } as ComponentConfig<typeof C.ExportMethod>,
          ],
          component: C.ExportSelectedData,
        } as ComponentConfig<typeof C.ExportSelectedData>,
      ],
      route: "/export",
      sideColumn: [
        {
          children: [
            {
              component: C.ExportCurrentQuery,
              viewBuilder: V.buildExportCurrentQuery,
            } as ComponentConfig<typeof C.ExportCurrentQuery>,
            {
              component: C.ExportSelectedDataSummary,
              viewBuilder: V.buildExportSelectedDataSummary,
            } as ComponentConfig<typeof C.ExportSelectedDataSummary>,
          ],
          component: C.ExportSummary,
        } as ComponentConfig<typeof C.ExportSummary>,
        {
          children: [
            {
              children: [
                {
                  component: MDX.DataReleasePolicy,
                } as ComponentConfig<typeof MDX.DataReleasePolicy>,
              ],
              component: MDX.Section,
            } as ComponentConfig<typeof MDX.Section>,
          ],
          component: C.FluidPaper,
        } as ComponentConfig<typeof C.FluidPaper>,
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

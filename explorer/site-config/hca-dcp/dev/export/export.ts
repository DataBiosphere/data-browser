import {
  BackPageConfig,
  ComponentConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";
import * as MDX from "../../../../app/content/hca-dcp";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const exportConfig: BackPageConfig = {
  detailOverviews: [],
  staticLoad: true,
  tabs: [
    {
      label: "Choose Export Method",
      mainColumn: [
        {
          children: [
            {
              component: C.ExportMethod,
              viewBuilder: V.buildExportToCurlCommand,
            } as ComponentConfig<typeof C.ExportMethod>,
            {
              component: C.ExportMethod,
              viewBuilder: V.buildExportToTerraMetadata,
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

import {
  BackPageConfig,
  ComponentConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";
import * as MDX from "../../../../app/content/hca-dcp";
import * as T from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const exportConfig: BackPageConfig = {
  detailOverviews: [],
  staticLoad: true,
  tabs: [
    {
      label: "Choose Export Method",
      mainColumn: [
        {
          component: C.ExportMethod,
          viewBuilder: T.buildExportToCurlCommand,
        } as ComponentConfig<typeof C.ExportMethod>,
        {
          component: C.ExportMethod,
          viewBuilder: T.buildExportToTerraMetadata,
        } as ComponentConfig<typeof C.ExportMethod>,
        {
          component: C.ExportMethod,
          viewBuilder: T.buildExportToCavaticaMetadata,
        } as ComponentConfig<typeof C.ExportMethod>,
      ],
      route: "/export",
      sideColumn: [
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
      props: {
        breadcrumbs: [
          { path: "/projects", text: "Projects" },
          { path: "/export", text: "Export" },
        ],
        title: "Choose Export Method",
      },
    } as ComponentConfig<typeof C.BackPageHero>,
  ],
};

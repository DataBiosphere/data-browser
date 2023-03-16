import {
  BackPageConfig,
  ComponentConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";
import * as T from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

export const exportConfig: BackPageConfig = {
  detailOverviews: [],
  staticLoad: true, //TODO is this correct?
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
      ],
      route: "/export",
      sideColumn: [
        {
          component: C.TitledText,
          viewBuilder: T.buildDataReleasePolicy,
        } as ComponentConfig<typeof C.TitledText>,
      ],
    },
  ],
  top: [
    {
      component: C.BackPageHero,
      props: {
        breadcrumbs: [
          { path: "/datasets", text: "Datasets" },
          { path: "/export", text: "Export" },
        ],
        title: "Choose Export Method",
      },
    } as ComponentConfig<typeof C.BackPageHero>,
  ],
};

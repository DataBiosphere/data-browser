import {
  ComponentConfig,
  ExportConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/content/anvil-cmg";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { ROUTE_EXPORT_TO_TERRA } from "./constants";

export const exportConfig: ExportConfig = {
  exportMethods: [
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
  staticLoad: true, //TODO is this correct?
  tabs: [
    {
      label: "Choose Export Method",
      mainColumn: [
        {
          children: [
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

import {
  ComponentConfig,
  ExportConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { ROUTE_EXPORT_TO_TERRA } from "./constants";
import { mainColumn as exportMainColumn } from "./exportMainColumn";
import { sideColumn as exportSideColumn } from "./exportSideColumn";

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
        /* mainColumn - top section - warning - some datasets are not available */
        ...exportMainColumn,
        /* mainColumn */
        {
          children: [
            {
              component: C.ExportMethod,
              viewBuilder: V.buildExportMethodTerra,
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

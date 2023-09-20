import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const mainColumn = [
  /* mainColumn - top section - warning */
  {
    children: [
      {
        component: C.FluidAlert,
        viewBuilder: V.buildExportWarning,
      } as ComponentConfig<typeof C.FluidAlert>,
    ],
    component: C.BackPageContentSingleColumn,
  } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
];

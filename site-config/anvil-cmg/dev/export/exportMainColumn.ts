import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const mainColumn = [
  /* mainColumn - top section - warning */
  {
    children: [
      {
        component: MDX.AlertExportWarning,
        viewBuilder: V.buildAlertExportWarning,
      } as ComponentConfig<typeof MDX.AlertExportWarning>,
    ],
    component: C.BackPageContentSingleColumn,
  } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
];

import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/hca-dcp";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const EXPORT_ACCESS_WARNING: ComponentConfig =
  /* mainColumn - top section - warning */
  {
    children: [
      {
        component: MDX.AlertExportWarning,
        viewBuilder: V.buildAlertExportWarning,
      } as ComponentConfig<typeof MDX.AlertExportWarning>,
    ],
    component: C.BackPageContentSingleColumn,
  } as ComponentConfig<typeof C.BackPageContentSingleColumn>;

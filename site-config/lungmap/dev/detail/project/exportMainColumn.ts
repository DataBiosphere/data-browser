import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/components/common/MDXContent/lungmap";
import * as V from "../../../../../app/viewModelBuilders/azul/lungmap/common/viewModelBuilders";
import { mainColumn as hcaExportMainColumn } from "../../../../hca-dcp/dev/detail/project/exportMainColumn";

export const mainColumn: ComponentConfig[] = [
  {
    children: [
      {
        component: MDX.BatchCorrectionWarning,
      } as ComponentConfig<typeof MDX.BatchCorrectionWarning>,
    ],
    component: C.FluidAlert,
    viewBuilder: V.buildBatchCorrectionWarning,
  } as ComponentConfig<typeof C.FluidAlert>,
  hcaExportMainColumn[1],
];

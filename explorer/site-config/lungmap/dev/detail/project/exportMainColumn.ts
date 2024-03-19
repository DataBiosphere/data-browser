import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/lungmap/common/viewModelBuilders";
import { mainColumn as hcaExportMainColumn } from "../../../../hca-dcp/dev/detail/project/exportMainColumn";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.FluidAlert,
    viewBuilder: V.buildBatchCorrectionWarning,
  } as ComponentConfig<typeof C.FluidAlert>,
  hcaExportMainColumn[1],
];

import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.FluidAlert,
    viewBuilder: V.buildBatchCorrectionWarning,
  } as ComponentConfig<typeof C.FluidAlert>,
  {
    component: C.ExportToTerra,
    viewBuilder: V.buildExportEntityToTerra,
  } as ComponentConfig<typeof C.ExportToTerra, ProjectsResponse>,
];

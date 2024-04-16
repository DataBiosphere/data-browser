import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/components/common/MDXContent/hca-dcp";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

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
  {
    component: C.ExportToTerra,
    viewBuilder: V.buildExportEntityToTerra,
  } as ComponentConfig<typeof C.ExportToTerra, ProjectsResponse>,
];

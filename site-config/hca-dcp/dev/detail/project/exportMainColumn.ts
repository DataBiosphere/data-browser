import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Alert/constants";
import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { SIZE } from "@databiosphere/findable-ui/lib/styles/common/constants/size";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/components/common/MDXContent/hca-dcp";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const mainColumn: ComponentConfig[] = [
  {
    component: MDX.AlertBatchCorrectionWarning,
    props: {
      ...ALERT_PROPS.STANDARD_WARNING,
      component: C.FluidPaper,
      size: SIZE.LARGE,
    },
  } as ComponentConfig<typeof MDX.AlertBatchCorrectionWarning>,
  {
    component: C.ExportToTerra,
    viewBuilder: V.buildExportEntityToTerra,
  } as ComponentConfig<typeof C.ExportToTerra, ProjectsResponse>,
];

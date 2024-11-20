import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Alert/constants";
import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { SIZE } from "@databiosphere/findable-ui/lib/styles/common/constants/size";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/components/common/MDXContent/lungmap";
import { mainColumn as hcaExportMainColumn } from "../../../../hca-dcp/dev/detail/project/exportMainColumn";

export const mainColumn: ComponentConfig[] = [
  {
    component: MDX.AlertBatchCorrectionWarning,
    props: {
      ...ALERT_PROPS.STANDARD_WARNING,
      component: C.FluidPaper,
      size: SIZE.LARGE,
    },
  } as ComponentConfig<typeof MDX.AlertBatchCorrectionWarning>,
  hcaExportMainColumn[1],
];

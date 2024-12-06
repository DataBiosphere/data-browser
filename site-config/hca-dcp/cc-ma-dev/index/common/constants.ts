import {
  ColumnConfig,
  ComponentConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import { PickSome } from "../../../../../app/common/types";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../category";

export const COLUMN: PickSome<
  Record<keyof typeof HCA_DCP_CATEGORY_KEY, ColumnConfig>,
  "ACCESSIBLE" | "DATA_USE_RESTRICTION"
> = {
  ACCESSIBLE: {
    componentConfig: {
      component: C.StatusBadge,
      viewBuilder: V.buildProjectAccess,
    } as ComponentConfig<typeof C.StatusBadge, ProjectsResponse>,
    disableSorting: true,
    header: HCA_DCP_CATEGORY_LABEL.ACCESSIBLE,
    id: HCA_DCP_CATEGORY_KEY.ACCESSIBLE,
    width: "auto",
  },
  DATA_USE_RESTRICTION: {
    componentConfig: {
      component: C.BasicCell,
      viewBuilder: V.buildDataUseRestriction,
    } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
    header: HCA_DCP_CATEGORY_LABEL.DATA_USE_RESTRICTION,
    id: HCA_DCP_CATEGORY_KEY.DATA_USE_RESTRICTION,
    width: { max: "1fr", min: "124px" },
  },
};

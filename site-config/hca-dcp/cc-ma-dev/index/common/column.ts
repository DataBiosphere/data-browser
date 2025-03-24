import {
  ColumnConfig,
  ComponentConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { FilesResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import { PickSome } from "../../../../../app/common/types";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../category";

export const COLUMN: PickSome<
  Record<
    keyof typeof HCA_DCP_CATEGORY_KEY,
    ColumnConfig<FilesResponse | ProjectsResponse>
  >,
  "DATA_USE_RESTRICTION"
> = {
  DATA_USE_RESTRICTION: {
    componentConfig: {
      component: C.BasicCell,
      viewBuilder: V.buildDataUseRestriction,
    } as ComponentConfig<typeof C.BasicCell, FilesResponse | ProjectsResponse>,
    header: HCA_DCP_CATEGORY_LABEL.DATA_USE_RESTRICTION,
    id: HCA_DCP_CATEGORY_KEY.DATA_USE_RESTRICTION,
    width: { max: "1fr", min: "124px" },
  },
};

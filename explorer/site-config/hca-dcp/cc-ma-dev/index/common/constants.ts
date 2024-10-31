import {
  CategoryGroup,
  ColumnConfig,
  ComponentConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import { PickSome } from "../../../../../app/common/types";
import * as C from "../../../../../app/components";
import { mapSelectCategoryValue } from "../../../../../app/config/utils";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../category";
import { mapAccessibleValue } from "./utils";

export const CATEGORY_GROUP: PickSome<
  Record<keyof typeof HCA_DCP_CATEGORY_KEY, CategoryGroup>,
  "ACCESSIBLE"
> = {
  ACCESSIBLE: {
    categoryConfigs: [
      {
        key: HCA_DCP_CATEGORY_KEY.ACCESSIBLE,
        label: HCA_DCP_CATEGORY_LABEL.ACCESSIBLE,
        mapSelectCategoryValue: mapSelectCategoryValue(mapAccessibleValue),
      },
    ],
    label: "Access",
  },
};

export const COLUMN: PickSome<
  Record<keyof typeof HCA_DCP_CATEGORY_KEY, ColumnConfig>,
  "ACCESSIBLE"
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
};

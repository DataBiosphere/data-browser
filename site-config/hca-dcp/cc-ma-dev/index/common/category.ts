import {
  CategoryConfig,
  CategoryGroup,
} from "@databiosphere/findable-ui/lib/config/entities";
import { mapSelectCategoryValue } from "../../../../../app/config/utils";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../category";
import { CATEGORY_GROUP } from "../../../dev/index/common/category";
import { mapAccessibleValue } from "./utils";

export const ACCESSIBLE: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.ACCESSIBLE,
  label: HCA_DCP_CATEGORY_LABEL.ACCESSIBLE,
  mapSelectCategoryValue: mapSelectCategoryValue(mapAccessibleValue),
};

export const DATA_USE_RESTRICTION: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.DATA_USE_RESTRICTION,
  label: HCA_DCP_CATEGORY_LABEL.DATA_USE_RESTRICTION,
};

export const MA_CATEGORY_GROUP: Record<string, CategoryGroup> = {
  PROJECT: {
    ...CATEGORY_GROUP.PROJECT,
    categoryConfigs: [
      ...CATEGORY_GROUP.PROJECT.categoryConfigs,
      ACCESSIBLE,
      DATA_USE_RESTRICTION,
    ],
  },
};

export const CATEGORY_GROUPS: CategoryGroup[] = [
  MA_CATEGORY_GROUP.PROJECT,
  CATEGORY_GROUP.DONOR,
  CATEGORY_GROUP.SAMPLE,
  CATEGORY_GROUP.PROTOCOL,
  CATEGORY_GROUP.FILE,
];

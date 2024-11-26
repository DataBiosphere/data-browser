import {
  CategoryConfig,
  CategoryGroup,
} from "@databiosphere/findable-ui/lib/config/entities";
import {
  ACCESSIBLE,
  MA_CATEGORY_GROUP,
} from "site-config/hca-dcp/cc-ma-dev/index/common/category";
import {
  BIONETWORK_NAME,
  CATEGORY_GROUP,
} from "site-config/hca-dcp/dev/index/common/category";

export const PROJECTS_CATEGORY_KEYS_EXCLUDE = [
  ACCESSIBLE.key,
  BIONETWORK_NAME.key,
];

export const LUNGMAP_CATEGORY_GROUP: Record<string, CategoryGroup> = {
  PROJECT: {
    ...MA_CATEGORY_GROUP.PROJECT,
    categoryConfigs: [
      ...MA_CATEGORY_GROUP.PROJECT.categoryConfigs.filter(
        (categoryGroup: CategoryConfig) =>
          !PROJECTS_CATEGORY_KEYS_EXCLUDE.includes(categoryGroup.key)
      ),
    ],
  },
};

export const CATEGORY_GROUPS: CategoryGroup[] = [
  LUNGMAP_CATEGORY_GROUP.PROJECT,
  CATEGORY_GROUP.DONOR,
  CATEGORY_GROUP.SAMPLE,
  CATEGORY_GROUP.PROTOCOL,
  CATEGORY_GROUP.FILE,
];

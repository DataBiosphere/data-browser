import {
  EntityConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import { HCA_DCP_CATEGORY_KEY } from "../../../category";

export const TABLE_OPTIONS: EntityConfig<ProjectsResponse>["list"]["tableOptions"] =
  {
    initialState: {
      columnVisibility: {
        [HCA_DCP_CATEGORY_KEY.SAMPLE_ENTITY_TYPE]: false,
        [HCA_DCP_CATEGORY_KEY.ORGAN_PART]: false,
        [HCA_DCP_CATEGORY_KEY.MODEL_ORGAN]: false,
        [HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE]: false,
        [HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE]: false,
        [HCA_DCP_CATEGORY_KEY.PAIRED_END]: false,
        [HCA_DCP_CATEGORY_KEY.WORKFLOW]: false,
        [HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE]: false,
        [HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE]: false,
        [HCA_DCP_CATEGORY_KEY.DONOR_COUNT]: false,
        [HCA_DCP_CATEGORY_KEY.AGGREGATE_SUBMISSION_DATE]: false,
      },
      sorting: [
        {
          desc: SORT_DIRECTION.DESCENDING,
          id: HCA_DCP_CATEGORY_KEY.AGGREGATE_LAST_MODIFIED_DATE,
        },
      ],
    },
  };

import {
  EntityConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { SamplesResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import { HCA_DCP_CATEGORY_KEY } from "../../../category";

export const TABLE_OPTIONS: EntityConfig<SamplesResponse>["list"]["tableOptions"] =
  {
    initialState: {
      columnVisibility: {
        [HCA_DCP_CATEGORY_KEY.ORGAN_PART]: false,
        [HCA_DCP_CATEGORY_KEY.MODEL_ORGAN]: false,
        [HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE]: false,
        [HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE]: false,
        [HCA_DCP_CATEGORY_KEY.PAIRED_END]: false,
        [HCA_DCP_CATEGORY_KEY.WORKFLOW]: false,
        [HCA_DCP_CATEGORY_KEY.ORGANISM_AGE]: false,
        [HCA_DCP_CATEGORY_KEY.BIOLOGICAL_SEX]: false,
        [HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE]: false,
        [HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE]: false,
      },
      sorting: [
        {
          desc: SORT_DIRECTION.ASCENDING,
          id: HCA_DCP_CATEGORY_KEY.SAMPLE_ID,
        },
      ],
    },
  };

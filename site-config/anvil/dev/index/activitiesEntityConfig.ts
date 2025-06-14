import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { ActivitiesResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "../category";

/**
 * Entity config object responsible for config related to the /activities route.
 */
export const activitiesEntityConfig: EntityConfig<ActivitiesResponse> = {
  apiPath: "index/activities",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  label: "Activities",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildDocumentId,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.DOCUMENT_ID,
        id: ANVIL_CATEGORY_KEY.DOCUMENT_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildActivityType,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.ACTIVITY_TYPE,
        id: ANVIL_CATEGORY_KEY.ACTIVITY_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.DATA_MODALITY,
        id: ANVIL_CATEGORY_KEY.DATA_MODALITY,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildBioSampleTypes,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.BIOSAMPLE_TYPE,
        id: ANVIL_CATEGORY_KEY.BIOSAMPLE_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildDatasetNames,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.DATASET_NAME,
        id: ANVIL_CATEGORY_KEY.DATASET_NAME,
        width: { max: "1fr", min: "200px" },
      },
    ],
    tableOptions: {
      initialState: {
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: ANVIL_CATEGORY_KEY.DOCUMENT_ID,
          },
        ],
      },
    },
  } as ListConfig<ActivitiesResponse>,
  route: "activities",
};

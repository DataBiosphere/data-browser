import { ActivitiesResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "../category";

/**
 * Entity config object responsible for config related to the /explore/activities route.
 */
export const activitiesEntityConfig: EntityConfig<ActivitiesResponse> = {
  apiPath: "index/activities",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  label: "Activities",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDocumentId,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATEGORY_LABEL.DOCUMENT_ID,
        id: ANVIL_CATEGORY_KEY.DOCUMENT_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildActivityType,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATEGORY_LABEL.ACTIVITY_TYPE,
        id: ANVIL_CATEGORY_KEY.ACTIVITY_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataModality,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.DATA_MODALITY,
        id: ANVIL_CATEGORY_KEY.DATA_MODALITY,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildBioSampleTypes,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATEGORY_LABEL.BIOSAMPLE_TYPE,
        id: ANVIL_CATEGORY_KEY.BIOSAMPLE_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDatasetNames,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATEGORY_LABEL.DATASET_NAME,
        id: ANVIL_CATEGORY_KEY.DATASET_NAME,
        width: { max: "1fr", min: "200px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CATEGORY_KEY.DOCUMENT_ID,
    },
  } as ListConfig<ActivitiesResponse>,
  route: "activities",
  staticLoad: false,
};

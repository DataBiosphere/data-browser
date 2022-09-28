import { ActivitiesResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

/**
 * Entity config object responsible for config related to the /explore/activities route.
 */
export const activitiesEntityConfig: EntityConfig<ActivitiesResponse> = {
  apiPath: "index/activities",
  detail: {
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
        header: "Document Id",
        sort: {
          default: true,
          sortKey: "document_id",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildActivityType,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Activity Type",
        sort: {
          sortKey: "activity_type",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataModality,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Data Modality",
        sort: {
          sortKey: "data_modality",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildBioSampleTypes,
        } as ComponentConfig<typeof Components.Cell>,
        header: "BioSample Type",
        sort: {
          sortKey: "biosample_type",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDatasetNames,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Dataset Name",
        sort: {
          sortKey: "title",
        },
        width: { max: "1fr", min: "200px" },
      },
    ],
  } as ListConfig<ActivitiesResponse>,
  route: "activities",
};

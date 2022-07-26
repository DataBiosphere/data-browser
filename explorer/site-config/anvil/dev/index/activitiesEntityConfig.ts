// App dependencies
import * as C from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/model";
import { ActivitiesResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as T from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

/**
 * Entity config object responsible for config related to the /explore/activities route.
 */
export const activitiesEntityConfig: EntityConfig<ActivitiesResponse> = {
  apiPath: "index/activities",
  detail: {
    tabs: [],
    top: [],
  },
  label: "Activities",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildDocumentId,
        } as ComponentConfig<typeof C.Cell>,
        header: "Document Id",
        sort: {
          default: true,
          sortKey: "document_id",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildActivityType,
        } as ComponentConfig<typeof C.Cell>,
        header: "Activity Type",
        sort: {
          sortKey: "activity_type",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Data Modality",
        sort: {
          sortKey: "data_modality",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildBioSampleTypes,
        } as ComponentConfig<typeof C.Cell>,
        header: "BioSample Type",
        sort: {
          sortKey: "biosample_type",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildDatasetNames,
        } as ComponentConfig<typeof C.Cell>,
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

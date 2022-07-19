// App dependencies
import * as T from "./activitiesViewModelBuilder";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
import { ActivitiesResponse } from "app/models/responses";

/**
 * Entity config object responsible to config anything related to the /explore/activities route.
 */
export const activitiesEntity: EntityConfig<ActivitiesResponse> = {
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
          transformer: T.buildBiosampleType,
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
          transformer: T.buildDatasetName,
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

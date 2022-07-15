// App dependencies
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
import { DatasetsResponse } from "app/models/responses";
import * as T from "./datasetsViewModelBuilder";

/**
 * Entity config object responsible to config anything related to the /explore/datasets route.
 */
export const datasetsEntity: EntityConfig<DatasetsResponse> = {
  apiPath: "index/datasets",
  detail: {
    tabs: [],
    top: [],
  },
  label: "Datasets",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildDatasetName,
        } as ComponentConfig<typeof C.Cell>,
        header: "Dataset Name",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildOrganismType,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Organism Type",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildPhenotypicSex,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Phenotypic Sex",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildReportedEthnicity,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Reported Ethnicity",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildLibraryPreparation,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Library Preparation",
        width: { max: "1fr", min: "200px" },
      },
    ],
  } as ListConfig<DatasetsResponse>,
  route: "datasets",
};

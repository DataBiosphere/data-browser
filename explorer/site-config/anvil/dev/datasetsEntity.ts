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
        sort: {
          default: true,
          sortKey: "title",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildOrganismType,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Organism Type",
        sort: {
          sortKey: "organism_type",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildPhenotypicSex,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Phenotypic Sex",
        sort: {
          sortKey: "phenotypic_sex",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildReportedEthnicity,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Reported Ethnicity",
        sort: {
          sortKey: "reported_ethnicity",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildLibraryPreparation,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Library Preparation",
        sort: {
          sortKey: "prep_material_name",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Data Modality",
        hiddenColumn: true,
        sort: {
          sortKey: "data_modality",
        },
        width: { max: "1fr", min: "148px" },
      },
    ],
  } as ListConfig<DatasetsResponse>,
  route: "datasets",
};

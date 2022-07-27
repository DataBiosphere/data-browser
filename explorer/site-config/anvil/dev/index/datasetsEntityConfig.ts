// App dependencies
import * as C from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import { mainColumn } from "../detail/dataset/overviewMainColumn";
import { sideColumn } from "../detail/dataset/overviewSideColumn";
import { top } from "../detail/dataset/top";
import { DatasetsResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as T from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

/**
 * Entity config object responsible for config related to the /explore/datasets route.
 */
export const datasetsEntityConfig: EntityConfig<DatasetsResponse> = {
  apiPath: "index/datasets",
  detail: {
    tabs: [
      {
        label: "Overview",
        mainColumn: mainColumn,
        route: "",
        sideColumn: sideColumn,
      },
    ],
    top: top,
  },
  label: "Datasets",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Links,
          transformer: T.buildDatasetName,
        } as ComponentConfig<typeof C.Links>,
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
          transformer: T.buildOrganismTypes,
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
          transformer: T.buildPhenotypicSexes,
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
          transformer: T.buildReportedEthnicities,
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
          transformer: T.buildPrepMaterialNames,
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

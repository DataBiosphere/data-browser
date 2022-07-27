// App dependencies
import * as C from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as T from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { DonorsResponse } from "../../../../app/apis/azul/anvil/common/responses";

/**
 * Entity config object responsible for config related to the /explore/donors route.
 */
export const donorsEntityConfig: EntityConfig<DonorsResponse> = {
  apiPath: "index/donors",
  detail: {
    tabs: [],
    top: [],
  },
  label: "Donors",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildDonorId,
        } as ComponentConfig<typeof C.Cell>,
        header: "Donor Id",
        sort: {
          default: true,
          sortKey: "donor_id",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildOrganismType,
        } as ComponentConfig<typeof C.Cell>,
        header: "Organism Type",
        sort: {
          sortKey: "organism_type",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildPhenotypicSex,
        } as ComponentConfig<typeof C.Cell>,
        header: "Phenoypic Sex",
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
          transformer: T.buildDatasetNames,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Dataset Name",
        sort: {
          sortKey: "title",
        },
        width: { max: "1fr", min: "200px" },
      },
    ],
  } as ListConfig<DonorsResponse>,
  route: "donors",
};

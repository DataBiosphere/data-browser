// App dependencies
import { LibrariesResponse } from "../../../../app/apis/azul/anvil/common/entities";
import * as C from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/model";
import * as T from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

/**
 * Entity config object responsible to config anything related to the /explore/donors route.
 */
export const donorsEntityConfig: EntityConfig<LibrariesResponse> = {
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
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildOrganismType,
        } as ComponentConfig<typeof C.Cell>,
        header: "Organism Type",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildPhenotypicSex,
        } as ComponentConfig<typeof C.Cell>,
        header: "Phenoypic Sex",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildReportedEthnicities,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Reported Ethnicity",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildDatasetNames,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Dataset Name",
        width: { max: "1fr", min: "200px" },
      },
    ],
  } as ListConfig<LibrariesResponse>,
  route: "donors",
};

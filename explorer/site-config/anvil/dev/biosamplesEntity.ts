// App dependencies
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
import { BiosamplesResponse } from "app/models/responses";
import * as T from "./biosamplesViewModelBuilder";

/**
 * Entity config object responsible to config anything related to the /explore/biosamples route.
 */
export const biosamplesEntity: EntityConfig<BiosamplesResponse> = {
  apiPath: "index/biosamples",
  detail: {
    tabs: [],
    top: [],
  },
  label: "Bio Samples",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildBiosampleId,
        } as ComponentConfig<typeof C.Cell>,
        header: "Biosample Id",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildBiosampleType,
        } as ComponentConfig<typeof C.Cell>,
        header: "Biosample Type",
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
          component: C.Cell,
          transformer: T.buildAnatomicalSite,
        } as ComponentConfig<typeof C.Cell>,
        header: "Anatomical Site",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildDatasetName,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Dataset Name",
        width: { max: "1fr", min: "200px" },
      },
    ],
  } as ListConfig<BiosamplesResponse>,
  route: "biosamples",
};

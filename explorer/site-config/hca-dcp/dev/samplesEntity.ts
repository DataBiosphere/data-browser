import * as T from "./sampleTransformer";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
import { SamplesResponse } from "app/models/responses";

/**
 * Entity config object responsible to config anything related to the /explore/samples route.
 */
export const samplesEntity: EntityConfig<SamplesResponse> = {
  apiPath: "index/samples",
  detail: {
    tabs: [],
    top: [],
  },
  label: "Samples",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Links,
          transformer: T.samplesToSampleIDColumn,
        } as ComponentConfig<typeof C.Links>,
        header: "Sample ID",
        sort: {
          default: true,
          sortKey: "sampleId",
        },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToProjTitleColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Project Title",
        sort: {
          sortKey: "projectTitle",
        },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToSpeciesColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Species",
        sort: {
          sortKey: "genusSpecies",
        },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToSampleTypeColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Sample Type",
        sort: {
          sortKey: "sampleEntityType",
        },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToLibConsApproachColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Library Construction Approach",
        sort: {
          sortKey: "libraryConstructionApproach",
        },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToAnatomicalEntityColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Anatomical Entity",
        sort: {
          sortKey: "specimenOrgan",
        },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToDiseaseDonorColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Disease (Donor)",
        sort: {
          sortKey: "donorDisease",
        },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToCellCountColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Cell Count Estimate",
        sort: {
          sortKey: "cellCount",
        },
      },
    ],
  } as ListConfig<SamplesResponse>,
  route: "samples",
};

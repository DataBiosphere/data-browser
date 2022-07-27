import * as T from "./sampleTransformer";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/common/entities";
import { SamplesResponse } from "app/models/responses";
import { buildDevStage } from "./projectViewModelBuilder";

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
          component: C.Text,
          transformer: T.samplesToSampleIDColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Sample ID",
        sort: {
          default: true,
          sortKey: "sampleId",
        },
        width: { max: "1fr", min: "120px" },
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
        width: { max: "2fr", min: "240px" },
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
        width: { max: "1fr", min: "120px" },
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
        width: { max: "1fr", min: "120px" },
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
        width: { max: "1fr", min: "120px" },
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
        width: { max: "1fr", min: "120px" },
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
        width: { max: "1fr", min: "120px" },
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
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: buildDevStage,
        } as ComponentConfig<typeof C.Text>,
        header: "Development Stage",
        hiddenColumn: true,
        width: { max: "1fr", min: "148px" },
      },
    ],
  } as ListConfig<SamplesResponse>,
  route: "samples",
};

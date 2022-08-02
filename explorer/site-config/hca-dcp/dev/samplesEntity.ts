import * as ViewBuilder from "./sampleTransformer";
import * as Components from "../../../app/components";
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
          component: Components.Text,
          viewBuilder: ViewBuilder.samplesToSampleIDColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Sample ID",
        sort: {
          default: true,
          sortKey: "sampleId",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.samplesToProjTitleColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Project Title",
        sort: {
          sortKey: "projectTitle",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.samplesToSpeciesColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Species",
        sort: {
          sortKey: "genusSpecies",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.samplesToSampleTypeColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Sample Type",
        sort: {
          sortKey: "sampleEntityType",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.samplesToLibConsApproachColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Library Construction Approach",
        sort: {
          sortKey: "libraryConstructionApproach",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.samplesToAnatomicalEntityColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Anatomical Entity",
        sort: {
          sortKey: "specimenOrgan",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.samplesToDiseaseDonorColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Disease (Donor)",
        sort: {
          sortKey: "donorDisease",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.samplesToCellCountColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Cell Count Estimate",
        sort: {
          sortKey: "cellCount",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: buildDevStage,
        } as ComponentConfig<typeof Components.Text>,
        header: "Development Stage",
        hiddenColumn: true,
        width: { max: "1fr", min: "148px" },
      },
    ],
  } as ListConfig<SamplesResponse>,
  route: "samples",
};

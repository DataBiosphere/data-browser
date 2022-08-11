import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import { buildDevStage } from "../projectViewModelBuilder";
import { SamplesResponse } from "../../../../app/apis/azul/hca-dcp/common/entities";
import {
  samplesBuildAnatomicalEntity,
  samplesBuildCellCount,
  samplesBuildDiseaseDonor,
  samplesBuildLibConsApproach,
  samplesBuildProjTitle,
  samplesBuildSampleId,
  samplesBuildSampleType,
  samplesBuildSpecies,
} from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

/**
 * Entity config object responsible to config anything related to the /explore/samples route.
 */
export const samplesEntityConfig: EntityConfig<SamplesResponse> = {
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
          component: Components.Cell,
          viewBuilder: samplesBuildSampleId,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Sample ID",
        sort: {
          default: true,
          sortKey: "sampleId",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: samplesBuildProjTitle,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Project Title",
        sort: {
          sortKey: "projectTitle",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: samplesBuildSpecies,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Species",
        sort: {
          sortKey: "genusSpecies",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: samplesBuildSampleType,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Sample Type",
        sort: {
          sortKey: "sampleEntityType",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: samplesBuildLibConsApproach,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Library Construction Approach",
        sort: {
          sortKey: "libraryConstructionApproach",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: samplesBuildAnatomicalEntity,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Anatomical Entity",
        sort: {
          sortKey: "specimenOrgan",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: samplesBuildDiseaseDonor,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Disease (Donor)",
        sort: {
          sortKey: "donorDisease",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: samplesBuildCellCount,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Cell Count Estimate",
        sort: {
          sortKey: "cellCount",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: buildDevStage,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Development Stage",
        hiddenColumn: true,
        width: { max: "1fr", min: "148px" },
      },
    ],
  } as ListConfig<SamplesResponse>,
  route: "samples",
};

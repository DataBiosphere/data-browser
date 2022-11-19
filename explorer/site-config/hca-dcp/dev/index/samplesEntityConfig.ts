import { SamplesResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import {
  projectsBuildDevelopmentStage,
  samplesBuildAnatomicalEntity,
  samplesBuildCellCount,
  samplesBuildDiseaseDonor,
  samplesBuildLibraryConstructionApproach,
  samplesBuildProjTitle,
  samplesBuildSampleId,
  samplesBuildSampleType,
  samplesBuildSpecies,
} from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { HCADCP_FILTER_CATEGORY_KEYS } from "../../filter-category-keys";

/**
 * Entity config object responsible to config anything related to the /explore/samples route.
 */
export const samplesEntityConfig: EntityConfig<SamplesResponse> = {
  apiPath: "index/samples",
  detail: {
    detailOverviews: [],
    staticLoad: false,
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
          sortKey: HCADCP_FILTER_CATEGORY_KEYS.SAMPLE_ID,
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
          sortKey: HCADCP_FILTER_CATEGORY_KEYS.PROJECT_TITLE,
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
          sortKey: HCADCP_FILTER_CATEGORY_KEYS.GENUS_SPECIES,
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
          sortKey: HCADCP_FILTER_CATEGORY_KEYS.SAMPLE_ENTITY_TYPE,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: samplesBuildLibraryConstructionApproach,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Library Construction Approach",
        sort: {
          sortKey: HCADCP_FILTER_CATEGORY_KEYS.LIBRARY_CONSTRUCTION_APPROACH,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: samplesBuildAnatomicalEntity,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Anatomical Entity",
        sort: {
          sortKey: HCADCP_FILTER_CATEGORY_KEYS.SPECIMEN_ORGAN,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: samplesBuildDiseaseDonor,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Disease (Donor)",
        sort: {
          sortKey: HCADCP_FILTER_CATEGORY_KEYS.DONOR_DISEASE,
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
          sortKey: HCADCP_FILTER_CATEGORY_KEYS.CELL_COUNT,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: projectsBuildDevelopmentStage,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Development Stage",
        hiddenColumn: true,
        width: { max: "1fr", min: "148px" },
      },
    ],
  } as ListConfig<SamplesResponse>,
  route: "samples",
  staticLoad: false,
};

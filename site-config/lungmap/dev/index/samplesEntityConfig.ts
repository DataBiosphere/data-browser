import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "site-config/hca-dcp/category";
import { SamplesResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const samplesEntityConfig: EntityConfig = {
  apiPath: "index/samples",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  label: "Samples",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildSampleId,
        } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.SAMPLE_ID,
        id: HCA_DCP_CATEGORY_KEY.SAMPLE_ID,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Link,
          viewBuilder: V.buildAggregatedProjectTitle,
        } as ComponentConfig<typeof C.Link, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.PROJECT_TITLE,
        id: HCA_DCP_CATEGORY_KEY.PROJECT_TITLE,
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedDonorGenusSpecies,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: "Species", // TODO review header
        id: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildSampleEntityType,
        } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.SAMPLE_TYPE,
        id: HCA_DCP_CATEGORY_KEY.SAMPLE_ENTITY_TYPE,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedSpecimenOrgan,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.ANATOMICAL_ENTITY,
        id: HCA_DCP_CATEGORY_KEY.ANATOMICAL_ENTITY,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedSpecimenOrganPart,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.ORGAN_PART,
        id: HCA_DCP_CATEGORY_KEY.ORGAN_PART,
        width: { max: "1fr", min: "124px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildSampleModelOrgan,
        } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.MODEL_ORGAN,
        id: HCA_DCP_CATEGORY_KEY.MODEL_ORGAN,
        width: { max: "1fr", min: "124px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedCellSuspensionSelectedCellType,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.SELECTED_CELL_TYPE,
        id: HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedProtocolLibraryConstructionApproach,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
        id: HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedProtocolNucleicAcidSource,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.NUCLEIC_ACID_SOURCE,
        id: HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAggregatedProtocolPairedEnd,
        } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.PAIRED_END,
        id: HCA_DCP_CATEGORY_KEY.PAIRED_END,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedProtocolWorkflow,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.WORKFLOW,
        id: HCA_DCP_CATEGORY_KEY.WORKFLOW,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedDonorOrganismAge,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.ORGANISM_AGE,
        id: HCA_DCP_CATEGORY_KEY.ORGANISM_AGE,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAggregatedDonorBiologicalSex,
        } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
        header: "Sex",
        id: HCA_DCP_CATEGORY_KEY.BIOLOGICAL_SEX,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedSpecimenDisease,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: "Disease (Specimen)",
        id: HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedDonorDisease,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: "Disease (Donor)", // TODO confirm header
        id: HCA_DCP_CATEGORY_KEY.DONOR_DISEASE,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedDonorDevelopmentStage,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.DEVELOPMENT_STAGE,
        id: HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE,
        width: { max: "1fr", min: "148px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildTotalCells,
        } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.CELL_COUNT,
        id: HCA_DCP_CATEGORY_KEY.CELL_COUNT,
        width: { max: "1fr", min: "124px" },
      },
    ],
    tableOptions: {
      initialState: {
        columnVisibility: {
          [HCA_DCP_CATEGORY_KEY.ORGAN_PART]: false,
          [HCA_DCP_CATEGORY_KEY.MODEL_ORGAN]: false,
          [HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE]: false,
          [HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE]: false,
          [HCA_DCP_CATEGORY_KEY.PAIRED_END]: false,
          [HCA_DCP_CATEGORY_KEY.WORKFLOW]: false,
          [HCA_DCP_CATEGORY_KEY.ORGANISM_AGE]: false,
          [HCA_DCP_CATEGORY_KEY.BIOLOGICAL_SEX]: false,
          [HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE]: false,
          [HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE]: false,
        },
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: HCA_DCP_CATEGORY_KEY.SAMPLE_ID,
          },
        ],
      },
    },
  } as ListConfig<SamplesResponse>,
  route: "samples",
};

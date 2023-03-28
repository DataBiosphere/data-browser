import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { SamplesResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { HCA_DCP_CATEGORY_KEY, HCA_DCP_CATEGORY_LABEL } from "../../category";

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
          component: C.Cell,
          viewBuilder: V.buildSampleId,
        } as ComponentConfig<typeof C.Cell, SamplesResponse>,
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
          viewBuilder: V.buildGenusSpecies,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: "Species", // TODO review header
        id: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildSampleEntityType,
        } as ComponentConfig<typeof C.Cell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.SAMPLE_TYPE,
        id: HCA_DCP_CATEGORY_KEY.SAMPLE_ENTITY_TYPE,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildLibraryConstructionApproach,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
        id: HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildSpecimenOrgan,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.ANATOMICAL_ENTITY,
        id: HCA_DCP_CATEGORY_KEY.ANATOMICAL_ENTITY,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDonorDisease,
        } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
        header: "Disease (Donor)", // TODO confirm header
        id: HCA_DCP_CATEGORY_KEY.DONOR_DISEASE,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildTotalCells,
        } as ComponentConfig<typeof C.Cell, SamplesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.CELL_COUNT,
        id: HCA_DCP_CATEGORY_KEY.CELL_COUNT,
        width: { max: "1fr", min: "124px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildDevelopmentStages,
        } as ComponentConfig<typeof C.Cell, SamplesResponse>,
        disableSorting: true,
        header: HCA_DCP_CATEGORY_LABEL.DEVELOPMENT_STAGE,
        id: HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE,
        width: { max: "1fr", min: "148px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: HCA_DCP_CATEGORY_KEY.SAMPLE_ID,
    },
  } as ListConfig<SamplesResponse>,
  route: "samples",
  staticLoad: false,
};

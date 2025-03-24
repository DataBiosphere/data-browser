import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { BioSamplesResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "../category";

/**
 * Entity config object responsible for config related to the /biosamples route.
 */
export const biosamplesEntityConfig: EntityConfig<BioSamplesResponse> = {
  apiPath: "index/biosamples",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  label: "BioSamples",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildBioSampleId,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.BIOSAMPLE_ID,
        id: ANVIL_CATEGORY_KEY.BIOSAMPLE_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildBioSampleType,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.BIOSAMPLE_TYPE,
        id: ANVIL_CATEGORY_KEY.BIOSAMPLE_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildOrganismTypes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.ORGANISM_TYPE,
        id: ANVIL_CATEGORY_KEY.ORGANISM_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildPhenotypicSexes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.PHENOTYPIC_SEX,
        id: ANVIL_CATEGORY_KEY.PHENOTYPIC_SEX,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAnatomicalSite,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.ANATOMICAL_SITE,
        id: ANVIL_CATEGORY_KEY.ANATOMICAL_SITE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDatasetNames,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.DATASET_NAME,
        id: ANVIL_CATEGORY_KEY.DATASET_NAME,
        width: { max: "1fr", min: "200px" },
      },
    ],
    tableOptions: {
      initialState: {
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: ANVIL_CATEGORY_KEY.BIOSAMPLE_ID,
          },
        ],
      },
    },
  } as ListConfig<BioSamplesResponse>,
  route: "biosamples",
};

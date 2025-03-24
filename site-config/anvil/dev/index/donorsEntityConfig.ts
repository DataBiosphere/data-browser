import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { DonorsResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "../category";

/**
 * Entity config object responsible for config related to the /donors route.
 */
export const donorsEntityConfig: EntityConfig<DonorsResponse> = {
  apiPath: "index/donors",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  label: "Donors",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildDonorId,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.DONOR_ID,
        id: ANVIL_CATEGORY_KEY.DONOR_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildOrganismType,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.ORGANISM_TYPE,
        id: ANVIL_CATEGORY_KEY.ORGANISM_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPhenotypicSex,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.PHENOTYPIC_SEX,
        id: ANVIL_CATEGORY_KEY.PHENOTYPIC_SEX,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildReportedEthnicity,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.REPORTED_ETHNICITY,
        id: ANVIL_CATEGORY_KEY.REPORTED_ETHNICITY,
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
            id: ANVIL_CATEGORY_KEY.DONOR_ID,
          },
        ],
      },
    },
  } as ListConfig<DonorsResponse>,
  route: "donors",
};

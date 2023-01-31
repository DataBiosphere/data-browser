import { DonorsResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "../category";

/**
 * Entity config object responsible for config related to the /explore/donors route.
 */
export const donorsEntityConfig: EntityConfig<DonorsResponse> = {
  apiPath: "index/donors",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  label: "Donors",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDonorId,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATEGORY_LABEL.DONOR_ID,
        id: ANVIL_CATEGORY_KEY.DONOR_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildOrganismType,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATEGORY_LABEL.ORGANISM_TYPE,
        id: ANVIL_CATEGORY_KEY.ORGANISM_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildPhenotypicSex,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATEGORY_LABEL.PHENOTYPIC_SEX,
        id: ANVIL_CATEGORY_KEY.PHENOTYPIC_SEX,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildReportedEthnicity,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.REPORTED_ETHNICITY,
        id: ANVIL_CATEGORY_KEY.REPORTED_ETHNICITY,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDatasetNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.DATASET_NAME,
        id: ANVIL_CATEGORY_KEY.DATASET_NAME,
        width: { max: "1fr", min: "200px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CATEGORY_KEY.DONOR_ID,
    },
  } as ListConfig<DonorsResponse>,
  route: "donors",
  staticLoad: false,
};

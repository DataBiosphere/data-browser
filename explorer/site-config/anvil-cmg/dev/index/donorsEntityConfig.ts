import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { DonorsResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as Components from "../../../../app/components";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";

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
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_ID,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildOrganismType,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Organism Type",
        id: "donors.organism_type",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildPhenotypicSex,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Phenoypic Sex",
        id: "donors.phenotypic_sex",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildReportedEthnicity,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Reported Ethnicity",
        id: "donors.reported_ethnicity",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDiagnoses,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Diagnosis",
        id: "diagnoses.phenotype",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDatasetTitles,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Dataset",
        id: "datasets.title",
        width: { max: "1fr", min: "200px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CMG_CATEGORY_KEY.DONOR_ID,
    },
  } as ListConfig<DonorsResponse>,
  route: "donors",
  staticLoad: false,
};

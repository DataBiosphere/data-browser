import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ActivitiesResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as Components from "../../../../app/components";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import * as ViewBuilders from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible for config related to the /explore/activities route.
 */
export const activitiesEntityConfig: EntityConfig<ActivitiesResponse> = {
  apiPath: "index/activities",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  label: "Activities",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDocumentId,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DOCUMENT_ID,
        id: ANVIL_CMG_CATEGORY_KEY.DOCUMENT_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildActivityType,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Activity Type",
        id: "activities.activity_type",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataModality,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Data Modality",
        id: "activities.data_modality",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildBioSampleTypes,
        } as ComponentConfig<typeof Components.Cell>,
        header: "BioSample Type",
        id: "biosamples.biosample_type",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilders.buildOrganismTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Organism Type",
        id: "donors.organism_type",
        width: { max: "1fr", min: "200px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilders.buildPhenotypicSexes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Phenotypic Sex",
        id: "donors.phenotypic_sex",
        width: { max: "1fr", min: "200px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildReportedEthnicity,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Reported Ethnicity",
        id: "donors.reported_ethnicity",
        width: { max: "1fr", min: "200px" },
      },
      {
        columnVisible: false,
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
      id: ANVIL_CMG_CATEGORY_KEY.DOCUMENT_ID,
    },
  } as ListConfig<ActivitiesResponse>,
  route: "activities",
  staticLoad: false,
};

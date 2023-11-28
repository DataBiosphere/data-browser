import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { EXPLORE_MODE } from "@clevercanary/data-explorer-ui/lib/hooks/useExploreMode";
import { ActivitiesResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";
import { listHero } from "../listView/listHero";
import { subTitleHero } from "../listView/subTitleHero";

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
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  label: "Activities",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildDocumentId,
        } as ComponentConfig<typeof C.Cell>,
        header: ANVIL_CMG_CATEGORY_LABEL.ACTIVITY_DOCUMENT_ID,
        id: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_DOCUMENT_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildActivityType,
        } as ComponentConfig<typeof C.Cell>,
        header: ANVIL_CMG_CATEGORY_LABEL.ACTIVITY_ACTIVITY_TYPE,
        id: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_ACTIVITY_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.ACTIVITY_DATA_MODALITY,
        id: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_DATA_MODALITY,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildBioSampleTypes,
        } as ComponentConfig<typeof C.Cell>,
        header: ANVIL_CMG_CATEGORY_LABEL.BIOSAMPLE_BIOSAMPLE_TYPE,
        id: ANVIL_CMG_CATEGORY_KEY.BIOSAMPLE_BIOSAMPLE_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildOrganismTypes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_ORGANISM_TYPE,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildPhenotypicSexes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_PHENOTYPIC_SEX,
        id: ANVIL_CMG_CATEGORY_LABEL.DONOR_PHENOTYPIC_SEX,
        width: { max: "1fr", min: "200px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildReportedEthnicity,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_REPORTED_ETHNICITY,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY,
        width: { max: "1fr", min: "200px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDiagnoses,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DIAGNOSE_PHENOTYPE,
        id: ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_PHENOTYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDatasetTitles,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DATASET_TITLE,
        id: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
        width: { max: "1fr", min: "200px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_DOCUMENT_ID,
    },
  } as ListConfig<ActivitiesResponse>,
  listView: {
    listHero,
    subTitleHero,
  },
  route: "activities",
};

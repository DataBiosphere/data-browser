import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
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
 * Entity config object responsible for config related to the /activities route.
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
  key: "activities",
  label: "Activities",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildDocumentId,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.ACTIVITY_DOCUMENT_ID,
        id: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_DOCUMENT_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildActivityType,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.ACTIVITY_ACTIVITY_TYPE,
        id: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_ACTIVITY_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildBioSampleTypes,
        } as ComponentConfig<typeof C.BasicCell>,
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
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildPhenotypicSexes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_PHENOTYPIC_SEX,
        id: ANVIL_CMG_CATEGORY_LABEL.DONOR_PHENOTYPIC_SEX,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildReportedEthnicity,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_REPORTED_ETHNICITY,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDiagnoses,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DIAGNOSE_DISEASE,
        id: ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_DISEASE,
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
    tableOptions: {
      initialState: {
        columnVisibility: {
          [ANVIL_CMG_CATEGORY_LABEL.DONOR_PHENOTYPIC_SEX]: false,
          [ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY]: false,
          [ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_DISEASE]: false,
        },
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_DOCUMENT_ID,
          },
        ],
      },
    },
  } as ListConfig<ActivitiesResponse>,
  listView: {
    listHero,
    subTitleHero,
  },
  route: "activities",
};

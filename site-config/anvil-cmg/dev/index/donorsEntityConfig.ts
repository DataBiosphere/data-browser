import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { DonorsResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";
import { entityListSlot } from "../ui/entityList";
import { entityViewSlot } from "../ui/entityView";

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
  key: "donors",
  label: "Donors",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildDonorId,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_DONOR_ID,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_DONOR_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildOrganismType,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_ORGANISM_TYPE,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPhenotypicSex,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_PHENOTYPIC_SEX,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX,
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
          viewBuilder: V.buildDiagnosesPhenotype,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DIAGNOSIS_PHENOTYPE,
        id: ANVIL_CMG_CATEGORY_KEY.DIAGNOSIS_PHENOTYPE,
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
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: ANVIL_CMG_CATEGORY_KEY.DONOR_DONOR_ID,
          },
        ],
      },
    },
  } as ListConfig<DonorsResponse>,
  route: "donors",
  ui: {
    enableExportButton: true,
    enableSummary: true,
    enableTabs: true,
    slots: {
      entityListSlot,
      entityViewSlot,
    },
  },
};

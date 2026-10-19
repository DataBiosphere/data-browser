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
          component: C.IdentityCell,
          viewBuilder: V.buildDonorIdentity,
        } as ComponentConfig<typeof C.IdentityCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_DONOR_ID,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_DONOR_ID,
        width: { max: "1.5fr", min: "340px" },
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
          viewBuilder: V.buildAggregatedDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_DATA_MODALITY,
        id: ANVIL_CMG_CATEGORY_KEY.FILE_DATA_MODALITY,
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

import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { DatasetsResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import { getDatasetEntryId } from "../../../../app/apis/azul/anvil-cmg/common/transformers";
import { getTitle } from "../../../../app/apis/azul/anvil-cmg/common/utils";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";
import { mainColumn } from "../detail/dataset/overviewMainColumn";
import { sideColumn } from "../detail/dataset/overviewSideColumn";
import { top } from "../detail/dataset/top";
import { listHero } from "../listView/datasetsListHero";
import { subTitleHero } from "../listView/subTitleHero";
import { exportConfig } from "../detail/dataset/export/export";

/**
 * Entity config object responsible for config related to the /datasets route.
 */
export const datasetsEntityConfig: EntityConfig<DatasetsResponse> = {
  apiPath: "index/datasets",
  detail: {
    detailOverviews: ["Overview"],
    staticLoad: true,
    tabs: [
      {
        label: "Overview",
        mainColumn: mainColumn,
        route: "",
        sideColumn: sideColumn,
      },
    ],
    top: top,
  },
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  export: exportConfig,
  getId: getDatasetEntryId,
  getTitle: getTitle,
  hideTabs: true,
  key: "datasets",
  label: "Datasets",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Link,
          viewBuilder: V.buildDatasetTitle,
        } as ComponentConfig<typeof C.Link>,
        header: ANVIL_CMG_CATEGORY_LABEL.DATASET_TITLE,
        id: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
        width: { max: "2fr", min: "280px" },
      },
      {
        componentConfig: {
          component: C.StatusBadge,
          viewBuilder: V.buildDatasetAccess,
        } as ComponentConfig<typeof C.StatusBadge>,
        enableSorting: false,
        header: ANVIL_CMG_CATEGORY_LABEL.DATASET_ACCESSIBLE,
        id: ANVIL_CMG_CATEGORY_KEY.DATASET_ACCESSIBLE,
        width: "max-content",
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildRegisteredIdentifier,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DATASET_REGISTERED_ID,
        id: ANVIL_CMG_CATEGORY_KEY.DATASET_REGISTERED_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildConsentGroup,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DATASET_CONSENT_GROUP,
        id: ANVIL_CMG_CATEGORY_KEY.DATASET_CONSENT_GROUP,
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
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildReportedEthnicities,
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
    ],
    tableOptions: {
      initialState: {
        columnVisibility: {
          [ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX]: false,
          [ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY]: false,
        },
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
          },
        ],
      },
    },
  } as ListConfig<DatasetsResponse>,
  listView: {
    listHero,
    subTitleHero,
  },
  route: "datasets",
};

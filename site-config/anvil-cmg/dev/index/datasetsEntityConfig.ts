import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { DatasetsResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import { getDatasetEntryId } from "../../../../app/apis/azul/anvil-cmg/common/transformers";
import { getTitle } from "../../../../app/apis/azul/anvil-cmg/common/utils";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";
import { exportConfig } from "../detail/dataset/export/export";
import { mainColumn } from "../detail/dataset/overviewMainColumn";
import { sideColumn } from "../detail/dataset/overviewSideColumn";
import { top } from "../detail/dataset/top";
import { entityListSlot } from "../ui/datasetsEntityList";
import { entityViewSlot } from "../ui/entityView";

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
          component: C.IdentityCell,
          viewBuilder: V.buildDatasetIdentity,
        } as ComponentConfig<typeof C.IdentityCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DATASET_TITLE,
        id: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
        width: { max: "1.5fr", min: "340px" },
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
        columnVisibility: {
          [ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX]: false,
          [ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY]: false,
          [ANVIL_CMG_CATEGORY_KEY.FILE_DATA_MODALITY]: false,
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
  route: "datasets",
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

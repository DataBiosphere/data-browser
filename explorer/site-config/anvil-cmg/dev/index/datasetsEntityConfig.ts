import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import { getDatasetEntryId } from "../../../../app/apis/azul/anvil-cmg/common/transformers";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";
import { mainColumn as exportMainColumn } from "../detail/dataset/exportMainColumn";
import { mainColumn } from "../detail/dataset/overviewMainColumn";
import { sideColumn } from "../detail/dataset/overviewSideColumn";
import { top } from "../detail/dataset/top";
import { listHero } from "../listView/datasetsListHero";

/**
 * Entity config object responsible for config related to the /explore/datasets route.
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
      {
        label: "Export",
        mainColumn: exportMainColumn,
        route: "export-to-terra",
      },
    ],
    top: top,
  },
  getId: getDatasetEntryId,
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
        disableSorting: true,
        header: ANVIL_CMG_CATEGORY_LABEL.DATASET_ACCESSIBLE,
        id: ANVIL_CMG_CATEGORY_KEY.DATASET_ACCESSIBLE,
        width: "max-content",
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildRegisteredIdentifier,
        } as ComponentConfig<typeof C.Cell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DATASET_REGISTERED_ID,
        id: ANVIL_CMG_CATEGORY_KEY.DATASET_REGISTERED_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildConsentGroup,
        } as ComponentConfig<typeof C.Cell>,
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
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildPhenotypicSexes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_PHENOTYPIC_SEX,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX,
        width: { max: "1fr", min: "200px" },
      },
      {
        columnVisible: false,
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
        header: ANVIL_CMG_CATEGORY_LABEL.DIAGNOSE_PHENOTYPE,
        id: ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_PHENOTYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.ACTIVITY_DATA_MODALITY,
        id: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_DATA_MODALITY,
        width: { max: "1fr", min: "148px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
    },
  } as ListConfig<DatasetsResponse>,
  listView: {
    listHero,
  },
  route: "datasets",
  staticLoad: false,
};

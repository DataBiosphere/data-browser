import {
  ColumnConfig,
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { TABLE_CELL_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/tableCell";
import { FilesResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";
import { entityViewSlot } from "../ui/entityView";
import { filesEntityListSlot } from "../ui/filesEntityList";
import { getValueColumnSizing } from "./common/columns";

export const downloadColumn: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.FileDownloadMenu,
    viewBuilder: V.buildFileDownloadMenu,
  } as ComponentConfig<typeof C.FileDownloadMenu>,
  enableHiding: false,
  enableSorting: false,
  header: ANVIL_CMG_CATEGORY_LABEL.AZUL_FILE_DOWNLOAD,
  id: ANVIL_CMG_CATEGORY_KEY.AZUL_FILE_DOWNLOAD,
  meta: { padding: TABLE_CELL_PROPS.PADDING.CHECKBOX },
  width: "max-content",
};

/**
 * Entity config object responsible for config related to the /files route.
 */
export const filesEntityConfig: EntityConfig<FilesResponse> = {
  apiPath: "index/files",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  key: "files",
  label: "Files",
  list: {
    columns: [
      downloadColumn,
      {
        columnPinned: true,
        componentConfig: {
          component: C.IdentityCell,
          viewBuilder: V.buildFileIdentity,
        } as ComponentConfig<typeof C.IdentityCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_NAME,
        id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_NAME,
        width: { max: "1.5fr", min: "340px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDatasetTitles,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DATASET_TITLE,
        id: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
        ...getValueColumnSizing(ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE),
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFileFormat,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_FORMAT,
        id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT,
        ...getValueColumnSizing(ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT),
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFileSize,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_SIZE,
        id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_SIZE,
        ...getValueColumnSizing(ANVIL_CMG_CATEGORY_KEY.FILE_FILE_SIZE),
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildOrganismTypes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_ORGANISM_TYPE,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE,
        ...getValueColumnSizing(ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE),
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildPhenotypicSexes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_PHENOTYPIC_SEX,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX,
        ...getValueColumnSizing(ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX),
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildReportedEthnicity,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_REPORTED_ETHNICITY,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY,
        ...getValueColumnSizing(
          ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY
        ),
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDiagnosesPhenotype,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DIAGNOSIS_PHENOTYPE,
        id: ANVIL_CMG_CATEGORY_KEY.DIAGNOSIS_PHENOTYPE,
        ...getValueColumnSizing(ANVIL_CMG_CATEGORY_KEY.DIAGNOSIS_PHENOTYPE),
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDiagnoses,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DIAGNOSE_DISEASE,
        id: ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_DISEASE,
        ...getValueColumnSizing(ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_DISEASE),
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildFileDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_DATA_MODALITY,
        id: ANVIL_CMG_CATEGORY_KEY.FILE_DATA_MODALITY,
        ...getValueColumnSizing(ANVIL_CMG_CATEGORY_KEY.FILE_DATA_MODALITY),
      },
    ],
    tableOptions: {
      initialState: {
        columnVisibility: {
          [ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX]: false,
          [ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY]: false,
          [ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_DISEASE]: false,
          [ANVIL_CMG_CATEGORY_KEY.FILE_DATA_MODALITY]: false,
        },
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_NAME,
          },
        ],
      },
    },
  } as ListConfig<FilesResponse>,
  route: "files",
  ui: {
    enableExportButton: true,
    enableSummary: true,
    enableTabs: true,
    slots: {
      entityListSlot: filesEntityListSlot,
      entityViewSlot,
    },
  },
};

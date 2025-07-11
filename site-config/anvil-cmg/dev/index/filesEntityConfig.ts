import {
  ColumnConfig,
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { FilesResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";
import { entityListSlot } from "../ui/entityList";
import { entityViewSlot } from "../ui/entityView";

export const downloadColumn: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.AzulFileDownload,
    viewBuilder: V.buildFileDownload,
  } as ComponentConfig<typeof C.AzulFileDownload>,
  enableHiding: false,
  enableSorting: false,
  header: ANVIL_CMG_CATEGORY_LABEL.AZUL_FILE_DOWNLOAD,
  id: ANVIL_CMG_CATEGORY_KEY.AZUL_FILE_DOWNLOAD,
  width: { max: "auto", min: "76px" },
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
      // downloadColumn,
      {
        columnPinned: true,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFileName,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_NAME,
        id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_NAME,
        width: { max: "1fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFileFormat,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_FORMAT, // "Format"
        id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT,
        width: { max: "auto", min: "120px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFileSize,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_SIZE,
        id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_SIZE,
        width: { max: "auto", min: "120px" },
      },
      {
        componentConfig: {
          component: C.CopyCell,
          viewBuilder: V.buildDRSURI,
        } as ComponentConfig<typeof C.CopyCell>,
        enableSorting: false,
        header: ANVIL_CMG_CATEGORY_LABEL.DRS_URI,
        id: ANVIL_CMG_CATEGORY_KEY.DRS_URI,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildOrganismTypes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DONOR_ORGANISM_TYPE,
        id: ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE,
        width: { max: "1fr", min: "140px" },
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
        width: { max: "1fr", min: "240px" },
      },
    ],
    tableOptions: {
      initialState: {
        columnVisibility: {
          [ANVIL_CMG_CATEGORY_KEY.AZUL_FILE_DOWNLOAD]: false,
          [ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX]: false,
          [ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY]: false,
          [ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_DISEASE]: false,
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
      entityListSlot,
      entityViewSlot,
    },
  },
};

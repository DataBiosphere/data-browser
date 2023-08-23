import {
  ColumnConfig,
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { FilesResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";
import { listHero } from "../listView/listHero";
import { subTitleHero } from "../listView/subTitleHero";

export const downloadColumn: ColumnConfig = {
  componentConfig: {
    component: C.AzulFileDownload,
    viewBuilder: V.buildFileDownload,
  } as ComponentConfig<typeof C.AzulFileDownload>,
  disableHiding: true,
  disableSorting: true,
  header: ANVIL_CMG_CATEGORY_LABEL.AZUL_FILE_DOWNLOAD,
  id: ANVIL_CMG_CATEGORY_KEY.AZUL_FILE_DOWNLOAD,
  width: { max: "auto", min: "76px" },
};

/**
 * Entity config object responsible for config related to the /explore/files route.
 */
export const filesEntityConfig: EntityConfig<FilesResponse> = {
  apiPath: "index/files",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  label: "Files",
  list: {
    columns: [
      // downloadColumn,
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildFileName,
        } as ComponentConfig<typeof C.Cell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_NAME,
        id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_NAME,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildFileFormat,
        } as ComponentConfig<typeof C.Cell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_FORMAT, // "Format"
        id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildFileSize,
        } as ComponentConfig<typeof C.Cell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_SIZE,
        id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_SIZE,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildFileDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.ACTIVITY_DATA_MODALITY,
        id: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_DATA_MODALITY,
        width: { max: "1fr", min: "240px" },
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
        width: { max: "2fr", min: "240px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_NAME,
    },
  } as ListConfig<FilesResponse>,
  listView: {
    listHero,
    subTitleHero,
  },
  route: "files",
  staticLoad: false,
};

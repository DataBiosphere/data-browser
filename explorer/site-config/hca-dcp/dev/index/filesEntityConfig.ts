import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { FilesResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { HCA_DCP_CATEGORY_KEY, HCA_DCP_CATEGORY_LABEL } from "../../category";

/**
 * Entity config object responsible to config anything related to the /explore/files route.
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
      {
        componentConfig: {
          component: C.AzulFileDownload,
          viewBuilder: V.buildFileDownload,
        } as ComponentConfig<typeof C.AzulFileDownload, FilesResponse>,
        disableHiding: true,
        disableSorting: true,
        header: HCA_DCP_CATEGORY_LABEL.AZUL_FILE_DOWNLOAD,
        id: HCA_DCP_CATEGORY_KEY.AZUL_FILE_DOWNLOAD,
        width: { max: "auto", min: "76px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildFileName,
        } as ComponentConfig<typeof C.Cell, FilesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.FILE_NAME,
        id: HCA_DCP_CATEGORY_KEY.FILE_NAME,
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildFileFormat,
        } as ComponentConfig<typeof C.Cell, FilesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.FILE_FORMAT,
        id: HCA_DCP_CATEGORY_KEY.FILE_FORMAT,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildFileSize,
        } as ComponentConfig<typeof C.Cell, FilesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.FILE_SIZE,
        id: HCA_DCP_CATEGORY_KEY.FILE_SIZE,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildContentDescriptions,
        } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.CONTENT_DESCRIPTION,
        id: HCA_DCP_CATEGORY_KEY.CONTENT_DESCRIPTION,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.Link,
          viewBuilder: V.buildAggregatedProjectTitle,
        } as ComponentConfig<typeof C.Link, FilesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.PROJECT_TITLE,
        id: HCA_DCP_CATEGORY_KEY.PROJECT_TITLE,
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: V.buildTotalCells,
        } as ComponentConfig<typeof C.Cell, FilesResponse>,
        header: HCA_DCP_CATEGORY_LABEL.CELL_COUNT,
        id: HCA_DCP_CATEGORY_KEY.CELL_COUNT,
        width: { max: "1fr", min: "124px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDevelopmentStages,
        } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
        disableSorting: true,
        header: HCA_DCP_CATEGORY_LABEL.DEVELOPMENT_STAGE,
        id: HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE,
        width: { max: "1fr", min: "148px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: HCA_DCP_CATEGORY_KEY.FILE_NAME,
    },
  } as ListConfig<FilesResponse>,
  route: "files",
  staticLoad: false,
};

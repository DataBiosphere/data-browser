import { FilesResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "../../../../app/config/common/entities";
import {
  filesBuildCellCount,
  filesBuildContentDesc,
  filesBuildFileDownload,
  filesBuildFileFormat,
  filesBuildFileName,
  filesBuildFileSize,
  filesBuildProjTitle,
  projectsBuildDevelopmentStage,
} from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
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
          component: Components.AzulFileDownload,
          viewBuilder: filesBuildFileDownload,
        } as ComponentConfig<typeof Components.AzulFileDownload>,
        disableHiding: true,
        disableSorting: true,
        header: HCA_DCP_CATEGORY_LABEL.AZUL_FILE_DOWNLOAD,
        id: HCA_DCP_CATEGORY_KEY.AZUL_FILE_DOWNLOAD,
        width: { max: "auto", min: "76px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildFileName,
        } as ComponentConfig<typeof Components.Cell>,
        header: HCA_DCP_CATEGORY_LABEL.FILE_NAME,
        id: HCA_DCP_CATEGORY_KEY.FILE_NAME,
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildFileFormat,
        } as ComponentConfig<typeof Components.Cell>,
        header: HCA_DCP_CATEGORY_LABEL.FILE_FORMAT,
        id: HCA_DCP_CATEGORY_KEY.FILE_FORMAT,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildFileSize,
        } as ComponentConfig<typeof Components.Cell>,
        header: HCA_DCP_CATEGORY_LABEL.FILE_SIZE,
        id: HCA_DCP_CATEGORY_KEY.FILE_SIZE,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildContentDesc,
        } as ComponentConfig<typeof Components.Cell>,
        header: HCA_DCP_CATEGORY_LABEL.CONTENT_DESCRIPTION,
        id: HCA_DCP_CATEGORY_KEY.CONTENT_DESCRIPTION,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildProjTitle,
        } as ComponentConfig<typeof Components.Cell>,
        header: HCA_DCP_CATEGORY_LABEL.PROJECT_TITLE,
        id: HCA_DCP_CATEGORY_KEY.PROJECT_TITLE,
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildCellCount,
        } as ComponentConfig<typeof Components.Cell>,
        header: HCA_DCP_CATEGORY_LABEL.CELL_COUNT,
        id: HCA_DCP_CATEGORY_KEY.CELL_COUNT,
        width: { max: "1fr", min: "120px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: Components.Text,
          viewBuilder: projectsBuildDevelopmentStage,
        } as ComponentConfig<typeof Components.Text>,
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

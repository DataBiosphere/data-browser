import { FilesResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import {
  filesBuildCellCount,
  filesBuildContentDesc,
  filesBuildFileDownload,
  filesBuildFileFormat,
  filesBuildFileName,
  filesBuildFileSize,
  filesBuildProjTitle,
} from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { buildDevStage } from "../projectViewModelBuilder";

/**
 * Entity config object responsible to config anything related to the /explore/files route.
 */
export const filesEntityConfig: EntityConfig<FilesResponse> = {
  apiPath: "index/files",
  detail: {
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
        header: " ",
        width: "auto",
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildFileName,
        } as ComponentConfig<typeof Components.Cell>,
        header: "File Name",
        sort: {
          default: true,
          sortKey: "fileName",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildFileFormat,
        } as ComponentConfig<typeof Components.Cell>,
        header: "File Format",
        sort: {
          sortKey: "fileFormat",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildFileSize,
        } as ComponentConfig<typeof Components.Cell>,
        header: "File Size",
        sort: {
          sortKey: "fileSize",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildContentDesc,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Content Description",
        sort: {
          sortKey: "contentDescription",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildProjTitle,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Project Title",
        sort: {
          sortKey: "projectTitle",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: filesBuildCellCount,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Cell Count Estimate",
        sort: {
          sortKey: "cellCount",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: buildDevStage,
        } as ComponentConfig<typeof Components.Text>,
        header: "Development Stage",
        hiddenColumn: true,
        width: { max: "1fr", min: "148px" },
      },
    ],
  } as ListConfig<FilesResponse>,
  route: "files",
};

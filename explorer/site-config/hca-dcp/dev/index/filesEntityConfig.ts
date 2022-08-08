import { buildDevStage } from "../projectViewModelBuilder";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import { FilesResponse } from "../../../../app/apis/azul/hca-dcp/common/entities";
import {
  buildCellCount,
  buildContentDesc,
  buildFileFormat,
  buildFileName,
  buildFileSize,
  buildProjTitle,
} from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

/**
 * Entity config object responsible to config anything related to the /explore/files route.
 */
export const filesEntityConfig: EntityConfig<FilesResponse> = {
  apiPath: "index/files",
  detail: {
    tabs: [],
    top: [],
  },
  label: "Files",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: buildFileName,
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
          viewBuilder: buildFileFormat,
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
          viewBuilder: buildFileSize,
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
          viewBuilder: buildContentDesc,
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
          viewBuilder: buildProjTitle,
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
          viewBuilder: buildCellCount,
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

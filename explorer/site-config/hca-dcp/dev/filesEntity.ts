import * as ViewBuilder from "./fileTransformer";
import { buildDevStage } from "./projectViewModelBuilder";
import * as Components from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/common/entities";
import { FilesResponse } from "app/models/responses";

/**
 * Entity config object responsible to config anything related to the /explore/files route.
 */
export const filesEntity: EntityConfig<FilesResponse> = {
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
          component: Components.Text,
          viewBuilder: ViewBuilder.filesToFileNameColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "File Name",
        sort: {
          default: true,
          sortKey: "fileName",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.filesToFileFormatColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "File Format",
        sort: {
          sortKey: "fileFormat",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.filesToFileSizeColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "File Size",
        sort: {
          sortKey: "fileSize",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.filesToContentDescColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Content Description",
        sort: {
          sortKey: "contentDescription",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.filesToProjTitleColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Project Title",
        sort: {
          sortKey: "projectTitle",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.filesToCellCountColumn,
        } as ComponentConfig<typeof Components.Text>,
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

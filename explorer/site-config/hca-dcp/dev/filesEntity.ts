import * as T from "./fileTransformer";
import { buildDevStage } from "./projectViewModelBuilder";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
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
          component: C.Links,
          transformer: T.filesToFileNameColumn,
        } as ComponentConfig<typeof C.Links>,
        header: "File Name",
        sort: {
          default: true,
          sortKey: "fileName",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileFormatColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File Format",
        sort: {
          sortKey: "fileFormat",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileSizeColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File Size",
        sort: {
          sortKey: "fileSize",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToContentDescColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Content Description",
        sort: {
          sortKey: "contentDescription",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToProjTitleColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Project Title",
        sort: {
          sortKey: "projectTitle",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToCellCountColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Cell Count Estimate",
        sort: {
          sortKey: "cellCount",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: buildDevStage,
        } as ComponentConfig<typeof C.Text>,
        header: "Development Stage",
        hiddenColumn: true,
        width: { max: "1fr", min: "148px" },
      },
    ],
  } as ListConfig<FilesResponse>,
  route: "files",
};

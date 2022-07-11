import * as T from "./fileTransformer";
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
      },
    ],
  } as ListConfig<FilesResponse>,
  route: "files",
};

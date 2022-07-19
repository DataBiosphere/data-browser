import * as T from "./fileTransformer";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
import { AnvilFilesResponse } from "app/models/responses";

/**
 * Entity config object responsible to config anything related to the /explore/files route.
 */
export const filesEntity: EntityConfig<AnvilFilesResponse> = {
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
          component: C.Text,
          transformer: T.filesToFileIdColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File ID",
        sort: {
          default: true,
          sortKey: "file_id",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileFormatColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File Format",
        sort: {
          sortKey: "file_format",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileTypeColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File Type",
        sort: {
          sortKey: "file_type",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToDataModalityColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Data Modality",
        sort: {
          sortKey: "data_modality",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToDatasetNameColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Dataset Name",
        sort: {
          sortKey: "title",
        },
        width: { max: "2fr", min: "240px" },
      },
    ],
  } as ListConfig<AnvilFilesResponse>,
  route: "files",
};

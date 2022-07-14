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
          transformer: T.filesToDatasetNameColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Dataset Name",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileFormatColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File Format",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileIdColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File ID",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileTypeColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File Type",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToDataModalityColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Data Modality",
        width: { max: "2fr", min: "240px" },
      },
    ],
  } as ListConfig<AnvilFilesResponse>,
  route: "files",
};

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
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileFormatColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File Format",
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileIdColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File ID",
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileTypeColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "File Type",
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.filesToDataModalityColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Data Modality",
      },
    ],
  } as ListConfig<AnvilFilesResponse>,
  route: "files",
};

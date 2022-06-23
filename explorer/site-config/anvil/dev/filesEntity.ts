import * as T from "./fileTransformer";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
import { AnvilFileResponse } from "app/models/responses";

/**
 * Entity config object responsible to config anything related to the /explore/files route.
 */
export const filesEntity: EntityConfig<AnvilFileResponse> = {
  label: "Files",
  apiPath: "index/files",
  route: "files",
  list: {
    columns: [
      {
        header: "Dataset Name",
        componentConfig: {
          component: C.Links,
          transformer: T.filesToDatasetNameColumn,
        } as ComponentConfig<typeof C.Links>,
      },
      {
        header: "File Format",
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileFormatColumn,
        } as ComponentConfig<typeof C.Text>,
      },
      {
        header: "File ID",
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileIdColumn,
        } as ComponentConfig<typeof C.Text>,
      },
      {
        header: "File Type",
        componentConfig: {
          component: C.Text,
          transformer: T.filesToFileTypeColumn,
        } as ComponentConfig<typeof C.Text>,
      },
      {
        header: "Data Modality",
        componentConfig: {
          component: C.Text,
          transformer: T.filesToDataModalityColumn,
        } as ComponentConfig<typeof C.Text>,
      },
    ],
  } as ListConfig<AnvilFileResponse>,
};

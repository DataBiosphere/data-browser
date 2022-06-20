import * as T from "./fileTransformer";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
import { FileResponse } from "app/models/responses";

/**
 * Entity config object responsible to config anything related to the /explore/files route.
 */
export const filesEntity: EntityConfig<FileResponse> = {
  label: "Files",
  apiPath: "index/files",
  route: "files",
  list: {
    columns: [
      {
        header: "File Name",
        componentConfig: {
          component: C.Links,
          transformer: T.filesToFileNameColumn,
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
        header: "Project Title",
        componentConfig: {
          component: C.Text,
          transformer: T.filesToProjTitleColumn,
        } as ComponentConfig<typeof C.Text>,
      },
    ],
  } as ListConfig<FileResponse>,
};

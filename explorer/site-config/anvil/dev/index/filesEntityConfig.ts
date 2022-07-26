import * as C from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/model";
import { FilesResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as T from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

/**
 * Entity config object responsible for config related to the /explore/files route.
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
          component: C.Cell,
          transformer: T.buildFileId,
        } as ComponentConfig<typeof C.Cell>,
        header: "File ID",
        sort: {
          default: true,
          sortKey: "file_id",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildFileFormat,
        } as ComponentConfig<typeof C.Cell>,
        header: "File Format",
        sort: {
          sortKey: "file_format",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildFileType,
        } as ComponentConfig<typeof C.Cell>,
        header: "File Type",
        sort: {
          sortKey: "file_type",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildFileDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Data Modality",
        sort: {
          sortKey: "data_modality",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildDatasetNames,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Dataset Name",
        sort: {
          sortKey: "title",
        },
        width: { max: "2fr", min: "240px" },
      },
    ],
  } as ListConfig<FilesResponse>,
  route: "files",
};

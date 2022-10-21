import { FilesResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

/**
 * Entity config object responsible for config related to the /explore/files route.
 */
export const filesEntityConfig: EntityConfig<FilesResponse> = {
  apiPath: "index/files",
  detail: {
    staticLoad: false,
    tabs: [],
    top: [],
  },
  label: "Files",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildFileId,
        } as ComponentConfig<typeof Components.Cell>,
        header: "File ID",
        sort: {
          default: true,
          sortKey: "file_id",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildFileFormat,
        } as ComponentConfig<typeof Components.Cell>,
        header: "File Format",
        sort: {
          sortKey: "file_format",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildFileType,
        } as ComponentConfig<typeof Components.Cell>,
        header: "File Type",
        sort: {
          sortKey: "file_type",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildFileDataModality,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Data Modality",
        sort: {
          sortKey: "data_modality",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDatasetNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Dataset Name",
        sort: {
          sortKey: "title",
        },
        width: { max: "2fr", min: "240px" },
      },
    ],
  } as ListConfig<FilesResponse>,
  route: "files",
  staticLoad: false,
};

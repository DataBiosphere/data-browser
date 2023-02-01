import { FilesResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible for config related to the /explore/files route.
 */
export const filesEntityConfig: EntityConfig<FilesResponse> = {
  apiPath: "index/files",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  label: "Files",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.AzulFileDownload,
          viewBuilder: ViewBuilder.buildFileDownload,
        } as ComponentConfig<typeof Components.AzulFileDownload>,
        disableHiding: true,
        disableSorting: true,
        header: ANVIL_CMG_CATEGORY_LABEL.AZUL_FILE_DOWNLOAD,
        id: ANVIL_CMG_CATEGORY_KEY.AZUL_FILE_DOWNLOAD,
        width: "auto",
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildFileName,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CMG_CATEGORY_LABEL.FILE_NAME,
        id: ANVIL_CMG_CATEGORY_KEY.FILE_NAME,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildFileFormat,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Format",
        id: "files.file_format",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildFileSize,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Size",
        id: "files.file_size",
        width: { max: "1fr", min: "120px" },
      },
      // { //TODO remove builders etc.
      //   componentConfig: {
      //     component: Components.Cell,
      //     viewBuilder: ViewBuilder.buildFileType,
      //   } as ComponentConfig<typeof Components.Cell>,
      //   header: "File Type",
      //   id: "files.file_type",
      //   width: { max: "1fr", min: "120px" },
      // },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildFileDataModality,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Data Modality",
        id: "activities.data_modality",
        width: { max: "1fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDatasetTitles,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Dataset",
        id: "datasets.title",
        width: { max: "2fr", min: "240px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CMG_CATEGORY_KEY.FILE_NAME,
    },
  } as ListConfig<FilesResponse>,
  route: "files",
  staticLoad: false,
};

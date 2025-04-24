import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { FilesResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "../category";

/**
 * Entity config object responsible for config related to the /files route.
 */
export const filesEntityConfig: EntityConfig<FilesResponse> = {
  apiPath: "index/files",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  label: "Files",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFileId,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.FILE_ID,
        id: ANVIL_CATEGORY_KEY.FILE_ID,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFileFormat,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.FILE_FORMAT,
        id: ANVIL_CATEGORY_KEY.FILE_FORMAT,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFileType,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATEGORY_LABEL.FILE_TYPE,
        id: ANVIL_CATEGORY_KEY.FILE_TYPE,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildFileDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.DATA_MODALITY,
        id: ANVIL_CATEGORY_KEY.DATA_MODALITY,
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDatasetNames,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.DATASET_NAME,
        id: ANVIL_CATEGORY_KEY.DATASET_NAME,
        width: { max: "2fr", min: "240px" },
      },
    ],
    tableOptions: {
      initialState: {
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: ANVIL_CATEGORY_KEY.FILE_ID,
          },
        ],
      },
    },
  } as ListConfig<FilesResponse>,
  route: "files",
};

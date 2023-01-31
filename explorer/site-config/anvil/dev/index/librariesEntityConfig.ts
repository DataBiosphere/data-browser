import { LibrariesResponse } from "../../../../app/apis/azul/anvil/common/responses";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "../category";

/**
 * Entity config object responsible for config related to the /explore/libraries route.
 */
export const librariesEntityConfig: EntityConfig<LibrariesResponse> = {
  apiPath: "index/libraries",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  label: "Libraries",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildLibraryId,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATEGORY_LABEL.LIBRARY_ID,
        id: ANVIL_CATEGORY_KEY.LIBRARY_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildPrepMaterialName,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATEGORY_LABEL.LIBRARY_PREPARATION,
        id: ANVIL_CATEGORY_KEY.LIBRARY_PREPARATION,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildBioSampleTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.BIOSAMPLE_TYPE,
        id: ANVIL_CATEGORY_KEY.BIOSAMPLE_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDatasetNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.DATASET_NAME,
        id: ANVIL_CATEGORY_KEY.DATASET_NAME,
        width: { max: "1fr", min: "200px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CATEGORY_KEY.LIBRARY_ID,
    },
  } as ListConfig<LibrariesResponse>,
  route: "libraries",
  staticLoad: false,
};

import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { LibrariesResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible for config related to the /libraries route.
 */
export const librariesEntityConfig: EntityConfig<LibrariesResponse> = {
  apiPath: "index/libraries",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  label: "Libraries",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildLibraryId,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.LIBRARY_ID,
        id: ANVIL_CMG_CATEGORY_KEY.LIBRARY_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPrepMaterialName,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.PREP_MATERIAL_NAME,
        id: ANVIL_CMG_CATEGORY_KEY.PREP_MATERIAL_NAME,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildBioSampleTypes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.BIOSAMPLE_TYPE,
        id: ANVIL_CMG_CATEGORY_KEY.BIOSAMPLE_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDatasetIds,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CMG_CATEGORY_LABEL.DATASET_ID,
        id: ANVIL_CMG_CATEGORY_KEY.DATASET_ID,
        width: { max: "1fr", min: "200px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CMG_CATEGORY_KEY.LIBRARY_ID,
    },
  } as ListConfig<LibrariesResponse>,
  route: "libraries",
};

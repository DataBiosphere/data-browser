import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { LibrariesResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as Components from "../../../../app/components";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../category";

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
        header: ANVIL_CMG_CATEGORY_LABEL.LIBRARY_ID,
        id: ANVIL_CMG_CATEGORY_KEY.LIBRARY_ID,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildPrepMaterialName,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Prep Material Name",
        id: "prep_material_name",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildBioSampleTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "BioSample Type",
        id: "biosample_type",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDatasetIds,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Dataset Name",
        id: "dataset_id",
        width: { max: "1fr", min: "200px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CMG_CATEGORY_KEY.LIBRARY_ID,
    },
  } as ListConfig<LibrariesResponse>,
  route: "libraries",
  staticLoad: false,
};

// App dependencies
import { LibrariesResponse } from "../../../../app/apis/azul/anvil/common/entities";
import * as C from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/model";
import * as T from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

/**
 * Entity config object responsible to config anything related to the /explore/libraries route.
 */
export const librariesEntityConfig: EntityConfig<LibrariesResponse> = {
  apiPath: "index/libraries",
  detail: {
    tabs: [],
    top: [],
  },
  label: "Libraries",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildLibraryId,
        } as ComponentConfig<typeof C.Cell>,
        header: "Library Id",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildPrepMaterialName,
        } as ComponentConfig<typeof C.Cell>,
        header: "Prep Material Name",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildBioSampleTypes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "BioSample Type",
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildDatasetNames,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "Dataset Names",
        width: { max: "1fr", min: "200px" },
      },
    ],
  } as ListConfig<LibrariesResponse>,
  route: "libraries",
};

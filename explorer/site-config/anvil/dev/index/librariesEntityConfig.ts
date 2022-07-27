// App dependencies
import * as C from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as T from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { LibrariesResponse } from "../../../../app/apis/azul/anvil/common/responses";

/**
 * Entity config object responsible for config related to the /explore/libraries route.
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
        sort: {
          default: true,
          sortKey: "library_id",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildPrepMaterialName,
        } as ComponentConfig<typeof C.Cell>,
        header: "Prep Material Name",
        sort: {
          sortKey: "prep_material_name",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildBioSampleTypes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: "BioSample Type",
        sort: {
          sortKey: "biosample_type",
        },
        width: { max: "1fr", min: "200px" },
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
        width: { max: "1fr", min: "200px" },
      },
    ],
  } as ListConfig<LibrariesResponse>,
  route: "libraries",
};

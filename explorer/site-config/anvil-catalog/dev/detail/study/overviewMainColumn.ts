import * as C from "app/components";
import { ComponentConfig } from "app/config/common/entities";
import { AnVILCatalogStudy } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as T from "../../../../../app/viewModelBuilders//anvil-catalog/common/viewModelBuilders";

export const mainColumn = [
  {
    component: C.Description,
    viewBuilder: T.buildStudyDescription,
  } as ComponentConfig<typeof C.Description, AnVILCatalogStudy>,
];

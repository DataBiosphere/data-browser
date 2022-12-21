import * as C from "app/components";
import { ComponentConfig } from "app/config/common/entities";
import { AnVILCatalogStudy } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as T from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const workspacesMainColumn = [
  {
    component: C.DetailViewTable,
    viewBuilder: T.buildDetailViewWorkspacesTable,
  } as ComponentConfig<typeof C.DetailViewTable, AnVILCatalogStudy>,
];
